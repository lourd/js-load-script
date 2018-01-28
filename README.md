# @lourd/load-script [![npm package badge][npm-badge]][npm] [![Build status][travis-badge]][travis]

[npm-badge]: https://img.shields.io/npm/v/@lourd/load-script.svg?style=flat-square
[npm]: https://www.npmjs.com/package/@lourd/load-script
[travis-badge]: https://travis-ci.org/lourd/js-load-script.svg
[travis]: https://travis-ci.org/lourd/js-load-script

This single-function JavaScript module is a simple, no-frills way to add script tags to a browser document asynchronously.

## Installation

### npm

```sh
yarn install @lourd/load-script
```

### In the browser

[Available as a simple `<script>` through unpkg.com](https://unpkg.com/@lourd/load-script). The function will be available as the global variable `loadScript`.

## API

### `loadScript(url: String) : Promise`

## Support

Bring your own Promise polyfill if you need to support browsers that do not have a native Promise implementation.

Does not support Internet Explorer.
