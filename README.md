# Cryptocurrency Table

A small project/prototype of a (almost) live updating price/volume dataset for BTC, BCH, ETH, and LTC, pulling from the GDAX API REST endpoints.

Original built to be included in a Wikimedia page, no styles are included, but the Wikimedia table classname is attached.

## Features

- Webpack v3
- Babel loader (JSX for React, ES latest using env preset, dynamic import support)
- Sass (as the `.scss` file type) and css import loaders, extracted to a new file.
- eslint (using default prettier config + required semi-colons, singleQuotes for strings, and 'es5' comma list mode; using babel parser for non-standard support.)
- jest (configured to handle style and file imports, import and dynamic import syntax.)

## Running this project

You need a current version of Node.js installed (currently testing and building with 9.3.0, but latest LTS should be fine (and probably Node v6 as well)).

Clone the project, and run `npm install` to install the dependencies.

Run the development server with `npm start`. This will open the test page in your browser, and rebuild then refresh the page on source changes.

You can also run the Webpack development build and source watcher with `npm run dev`, which will only recompile. (You might do this to use an external server).

You can make a production build of the bundle with `npm run build`.

## Dev tools

- Webpack v3
- Babel loader (JSX for Preact, ES latest using env preset, dynamic import support)
- Sass (as the `.scss` file type) and css import loaders, extracted to a new file.
- eslint (using default prettier config + required semi-colons, singleQuotes for strings, and 'es5' comma list mode; using babel parser for non-standard support.)
- jest (configured to handle style and file imports, import and dynamic import syntax.)
