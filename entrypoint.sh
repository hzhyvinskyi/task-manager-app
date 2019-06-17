#!/usr/bin/env bash
set -ex

PATH="$PATH:$(npm bin)"
nodemon --exec ts-node ./src/main.ts
