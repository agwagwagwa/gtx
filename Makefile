PYTHON   ?= python3
OUT      ?= dist
TAG      ?=
PLATFORM ?= all

.PHONY: build curseforge modrinth clean

build:
	$(PYTHON) .github/scripts/build_packs.py --out $(OUT) --platform $(PLATFORM) $(if $(TAG),--tag $(TAG))

curseforge:
	$(MAKE) build PLATFORM=curseforge

modrinth:
	$(MAKE) build PLATFORM=modrinth

clean:
	rm -rf $(OUT)
