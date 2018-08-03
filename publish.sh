#!/bin/sh

set -e

yarn && yarn build
(cd dist && git commit -am 'Up gh-pages')
