SHELL := /bin/bash

.PHONY: all
all:
	yarn review

.PHONY: install
install:
	yarn install

.PHONY: build
build:
	yarn build

.PHONY: develop
develop:
	yarn develop

.PHONY: lint
lint:
	yarn lint
