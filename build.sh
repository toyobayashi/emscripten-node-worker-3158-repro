#!/usr/bin/env bash

rm -rf ./out
mkdir -p ./out
emcc --no-entry -pthread -sMODULARIZE=1 -sEXPORT_NAME=lib -o ./out/lib.js ./src/lib.c
