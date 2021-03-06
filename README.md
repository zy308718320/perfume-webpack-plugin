# perfume-webpack-plugin

[![Build Status](https://travis-ci.com/zy308718320/perfume-webpack-plugin.svg?branch=master)](https://travis-ci.com/zy308718320/perfume-webpack-plugin)
[![Coverage Status](https://coveralls.io/repos/github/zy308718320/perfume-webpack-plugin/badge.svg?branch=master)](https://coveralls.io/github/zy308718320/perfume-webpack-plugin?branch=master)
![GitHub](https://img.shields.io/github/license/zy308718320/perfume-webpack-plugin)
![GitHub package.json version](https://img.shields.io/github/package-json/v/zy308718320/perfume-webpack-plugin)

A Webpack plugin to [perfume.js](https://github.com/Zizzamia/perfume.js)

English | [简体中文](./README-zh_CN.md)

## Installation:

First things first, install the module:

```console
npm i perfume-webpack-plugin -D
```
### Importing library
```javascript
import PerfumeWebpackPlugin from 'perfume-webpack-plugin'
```
### If using CommonJS import
```javascript
const PerfumeWebpackPlugin = require('perfume-webpack-plugin').default
```

## Example:

```javascript
const apiKey = 'xxx'
module.exports = {
  plugins: [
    new PerfumeWebpackPlugin({
      entry: /app\.js$/,
      fps: true,
      dataConsumption: true,
      resourceTiming: true,
      cumulativeLayoutShift: true,
      isMerge: true,
      reportUrl: `https://example.com/report?apiKey=${apiKey}`,
      ignoreResource: [{ key: 'name', value: '/report' }],
      logging: false,
    })
  ]
}
```

## Default Options:
```javascript
const options = {
  entry: /app\.js$/,
  // Metrics
  fps: false,
  dataConsumption: false,
  resourceTiming: false,
  cumulativeLayoutShift: false,
  // Analytics
  tag: '',
  reportUrl: '',
  ignoreResource: [],
  isMerge: false,
  analyticsTracker: option => {},
  // Logging
  logPrefix: 'Perfume.js:',
  logging: true,
  maxMeasureTime: 15000,
};

```

## License

#### [MIT](./LICENSE)
