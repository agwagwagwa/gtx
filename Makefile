PYTHON ?= python3
OUT    ?= dist
TAG    ?=

.PHONY: build clean

build:
	$(PYTHON) .github/scripts/build_packs.py --out $(OUT) $(if $(TAG),--tag $(TAG))

clean:
	rm -rf $(OUT)
