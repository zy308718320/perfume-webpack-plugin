# perfume-webpack-plugin

[![Build Status](https://travis-ci.com/zy308718320/perfume-webpack-plugin.svg?branch=master)](https://travis-ci.com/zy308718320/perfume-webpack-plugin)
[![Coverage Status](https://coveralls.io/repos/github/zy308718320/perfume-webpack-plugin/badge.svg?branch=master)](https://coveralls.io/github/zy308718320/perfume-webpack-plugin?branch=master)
![GitHub](https://img.shields.io/github/license/zy308718320/perfume-webpack-plugin)
![GitHub package.json version](https://img.shields.io/github/package-json/v/zy308718320/perfume-webpack-plugin)

A Webpack plugin to perfume.js

## Installation:

First things first, install the module:

```console
npm i perfume-webpack-plugin -D
```

## Example:

```javascript
const PerfumeWebpackPlugin = require('perfume-webpack-plugin');
module.exports = {
  plugins: [
    new PerfumeWebpackPlugin({
      // Metrics
      dataConsumption: false,
      resourceTiming: false,
      // Analytics
      analyticsTracker: options => {},
      // Logging
      logPrefix: "Perfume.js:",
      logging: true,
      maxMeasureTime: 15000,
    })
  ]
};
```

## License

#### [MIT](./LICENSE)
