SRC_DIR	 ?= src
REL_DIR	 ?= rel

.PHONY: deps build_dev build_prod doc clean test

all: build_dev

rel: build_prod

deps:
	./inject-default-gui.py
	cd $(SRC_DIR) && npm install --no-package-lock
	cd $(SRC_DIR) && bower install --allow-root

build_dev: deps
	cd $(SRC_DIR) && ember build -dev --output-path=../$(REL_DIR)

build_prod: deps
	cd $(SRC_DIR) && ember build -prod --output-path=../$(REL_DIR)

doc:
	jsdoc -c $(SRC_DIR)/.jsdoc.conf $(SRC_DIR)/app

clean:
	cd $(SRC_DIR) && rm -rf package-lock.json node_modules bower_components ../$(REL_DIR)/* tmp

test: deps
	cd $(SRC_DIR) && xvfb-run ember test

test_xunit_output: deps
	cd $(SRC_DIR) && xvfb-run ember test -r xunit

##
## Submodules
##

submodules:
	git submodule sync --recursive ${submodule}
	git submodule update --init --recursive ${submodule}

