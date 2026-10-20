"""Build CurseForge (.zip) and Modrinth (.mrpack) packs from mdpmp.json.

Each entry in "mods" may contain:
  path               where the file goes in the instance (default: mods/<filename>)
  client, server     "required" | "optional" | "unsupported" (default: "required")
  modrinth:
    downloads        direct URLs; the file is downloaded to compute hashes/size
    project_id/slug  looked up via the Modrinth API instead (primary file)
    version          optional version id or number to pin when using project_id/slug;
                     "any"/"latest" (or missing) uses the newest matching version
  curseforge:
    projectID        required
    fileID           optional; "any"/"latest" (or missing) uses the newest file for
                     the pack's MC version

Usage: python build_packs.py [--manifest mdpmp.json] [--out dist] [--tag v1.0.0]
"""

import argparse
import hashlib
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
import zipfile
from pathlib import Path

USER_AGENT = "agwagwagwa/gtx-pack-builder (github.com/agwagwagwa/gtx)"
MODRINTH_API = "https://api.modrinth.com/v2"
CURSEFORGE_API = "https://api.curseforge.com/v1"
CF_KEY_URL = "https://cf.polymc.org/api"
CF_FORGE_LOADER_TYPE = 1

# Never copied into overrides/, wherever "configs" points.
OVERRIDE_EXCLUDES = {".git", ".github", ".gitignore", ".gitattributes", "mdpmp.json", "dist", ".builder"}


def warn(msg):
    # The ::warning:: prefix makes the message show up as an annotation in GitHub Actions.
    print(f"::warning::{msg}", file=sys.stderr)


def fail(msg):
    print(f"::error::{msg}", file=sys.stderr)
    sys.exit(1)


def request(url, headers=None):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, **(headers or {})})
    return urllib.request.urlopen(req, timeout=60)


def get_json(url, headers=None):
    try:
        with request(url, {"Accept": "application/json", **(headers or {})}) as resp:
            return json.load(resp)
    except urllib.error.HTTPError as e:
        fail(f"HTTP {e.code} {e.reason} from {url}")


def fill_placeholders(value, common):
    """Replace {key} with common[key] in every string inside value."""
    if isinstance(value, str):
        for key, replacement in common.items():
            value = value.replace("{" + key + "}", str(replacement))
        return value
    if isinstance(value, list):
        return [fill_placeholders(v, common) for v in value]
    if isinstance(value, dict):
        return {k: fill_placeholders(v, common) for k, v in value.items()}
    return value


# --- Modrinth ---------------------------------------------------------------

def hash_download(url):
    sha1, sha512, size = hashlib.sha1(), hashlib.sha512(), 0
    with request(url) as resp:
        while chunk := resp.read(1 << 16):
            sha1.update(chunk)
            sha512.update(chunk)
            size += len(chunk)
    return {"sha1": sha1.hexdigest(), "sha512": sha512.hexdigest()}, size


def modrinth_lookup(project, version, common):
    query = urllib.parse.urlencode({
        "loaders": json.dumps(["forge"]),
        "game_versions": json.dumps([common["minecraft"]]),
        "include_changelog": "false",
        "limit": 1,
    })
    path = f"/project/{project}/version"
    # "any"/"latest" mean the same as leaving version out: newest matching version.
    if version and version.lower() not in ("any", "latest"):
        path += f"/{version}"
    data = get_json(f"{MODRINTH_API}{path}?{query}")
    # The list route returns an array; the single-version route returns one object.
    if isinstance(data, list):
        if not data:
            fail(f"Modrinth: no forge {common['minecraft']} version found for '{project}'")
        data = data[0]
    files = data["files"]
    return next((f for f in files if f["primary"]), files[0])


def modrinth_file(mod, common):
    mr = mod["modrinth"]
    project = mr.get("project_id") or mr.get("slug")
    if project:
        f = modrinth_lookup(project, mr.get("version"), common)
        downloads = [f["url"]]
        hashes = {"sha1": f["hashes"]["sha1"], "sha512": f["hashes"]["sha512"]}
        size, filename = f["size"], f["filename"]
    elif mr.get("downloads"):
        downloads = mr["downloads"]
        hashes, size = hash_download(downloads[0])
        filename = urllib.parse.unquote(downloads[0].rsplit("/", 1)[-1])
    else:
        fail(f"Modrinth entry needs 'downloads' or 'project_id'/'slug': {mr}")

    return {
        "path": mod.get("path") or f"mods/{filename}",
        "hashes": hashes,
        "env": {"client": mod.get("client", "required"), "server": mod.get("server", "required")},
        "downloads": downloads,
        "fileSize": size,
    }


# --- CurseForge -------------------------------------------------------------

_cf_key = None


def curseforge_key():
    global _cf_key
    if _cf_key is None:
        _cf_key = os.environ.get("CF_API_KEY") or get_json(CF_KEY_URL)["token"]
    return _cf_key


def curseforge_latest_file(project_id, common):
    query = urllib.parse.urlencode({
        "gameVersion": common["minecraft"],
        "modLoaderType": CF_FORGE_LOADER_TYPE,
        "pageSize": 1,
    })
    data = get_json(f"{CURSEFORGE_API}/mods/{project_id}/files?{query}",
                    {"x-api-key": curseforge_key()})["data"]
    if isinstance(data, list):
        if not data:
            fail(f"CurseForge: no forge {common['minecraft']} file found for project {project_id}")
        data = data[0]
    return data["id"]


def curseforge_file(mod, common):
    cf = mod["curseforge"]
    file_id = cf.get("fileID")
    # "any"/"latest" mean the same as leaving fileID out: newest matching file.
    if not file_id or str(file_id).lower() in ("any", "latest"):
        file_id = curseforge_latest_file(cf["projectID"], common)
    return {"projectID": cf["projectID"], "fileID": file_id, "required": True, "isLocked": False}


# --- Packaging --------------------------------------------------------------

def override_files(root, configs):
    src = (root / configs).resolve()
    if not src.is_dir():
        warn(f"Overrides folder '{configs}' does not exist; packs will have no overrides")
        return []
    files = []
    for path in sorted(src.rglob("*")):
        rel = path.relative_to(src)
        if path.is_file() and not OVERRIDE_EXCLUDES.intersection(rel.parts):
            files.append((path, rel.as_posix()))
    return files


def write_pack(dest, manifest_name, manifest, overrides):
    with zipfile.ZipFile(dest, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.writestr(manifest_name, json.dumps(manifest, indent=2))
        for path, rel in overrides:
            zf.write(path, f"overrides/{rel}")
    print(f"Wrote {dest}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--manifest", default="mdpmp.json")
    parser.add_argument("--out", default="dist")
    parser.add_argument("--tag", help="release tag, used as the pack version (a leading 'v' is dropped); "
                                      "defaults to packVersion from the manifest")
    args = parser.parse_args()

    manifest_path = Path(args.manifest)
    config = json.loads(manifest_path.read_text(encoding="utf-8"))
    common = config["common"]

    # The release tag is the pack version; packVersion in the manifest is only a
    # fallback for local builds without --tag.
    if args.tag:
        common["packVersion"] = args.tag.removeprefix("v")
    elif "packVersion" not in common:
        fail(f"No --tag given and no packVersion in {args.manifest}")

    cf_manifest = fill_placeholders(config["curseforge"], common)
    mr_index = fill_placeholders(config["modrinth"], common)
    cf_manifest["files"], mr_index["files"] = [], []

    for mod in config["mods"]:
        mr, cf = mod.get("modrinth", {}), mod.get("curseforge", {})
        name = (mod.get("path") or mr.get("slug") or mr.get("project_id")
                or f"curseforge:{cf.get('projectID')}")
        print(f"Resolving {name}")
        if "curseforge" in mod:
            cf_manifest["files"].append(curseforge_file(mod, common))
        else:
            warn(f"{name} has no curseforge entry; it will be missing from the CurseForge pack")
        if "modrinth" in mod:
            mr_index["files"].append(modrinth_file(mod, common))
        else:
            warn(f"{name} has no modrinth entry; it will be missing from the Modrinth pack")

    # Keep "dependencies" at the end, matching the layout Modrinth itself exports.
    mr_index["dependencies"] = mr_index.pop("dependencies")

    overrides = override_files(manifest_path.parent, common.get("configs", "overrides/"))
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    base = f"{common['packName']}-{common['packVersion']}"
    write_pack(out / f"{base}.zip", "manifest.json", cf_manifest, overrides)
    write_pack(out / f"{base}.mrpack", "modrinth.index.json", mr_index, overrides)


if __name__ == "__main__":
    main()
