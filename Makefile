SHELL := /bin/bash

.PHONY: all
all: \
	commitlint \
	prettier-markdown \
	git-verify-nodiff

include tools/commitlint/rules.mk
include tools/git-verify-nodiff/rules.mk
include tools/prettier/rules.mk
include tools/semantic-release/rules.mk
