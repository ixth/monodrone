#!/bin/sh

set -e

yarn && yarn build
git checkout gh-pages
git add -f build/* css/* index.html
git commit -m 'Up gh-pages'
