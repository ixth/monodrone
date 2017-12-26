git checkout gh-pages && \
git clean -df . && \
git checkout -f master -- . && \
git add . && \
yarn && \
git add -f -- \
    node_modules/flux/dist/Flux.js \
    node_modules/react/umd/react.development.js \
    node_modules/react-dom/umd/react-dom.development.js && \
git commit -m 'Up gh-pages'
