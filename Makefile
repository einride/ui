SHELL := /bin/bash

.PHONY: all
all: \
	install-deps \
	commitlint \
	prettier-markdown \
	git-verify-nodiff

include tools/commitlint/rules.mk
include tools/git-verify-nodiff/rules.mk
include tools/prettier/rules.mk
include tools/semantic-release/rules.mk

.PHONY: install-deps
install-deps:
	yarn install

.PHONY: build
build:
	yarn build
