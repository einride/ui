SHELL := /bin/bash

.PHONY: all
all:
	yarn review

.PHONY: install-deps
install-deps:
	yarn install

.PHONY: build
build:
	yarn build

.PHONY: develop
develop:
	yarn storybook

.PHONY: lint
lint:
	yarn lint
