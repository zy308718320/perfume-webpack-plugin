# perfume-webpack-plugin

[![Build Status](https://travis-ci.com/zy308718320/perfume-webpack-plugin.svg?branch=master)](https://travis-ci.com/zy308718320/perfume-webpack-plugin)
[![Coverage Status](https://coveralls.io/repos/github/zy308718320/perfume-webpack-plugin/badge.svg?branch=master)](https://coveralls.io/github/zy308718320/perfume-webpack-plugin?branch=master)
![GitHub](https://img.shields.io/github/license/zy308718320/perfume-webpack-plugin)
![GitHub package.json version](https://img.shields.io/github/package-json/v/zy308718320/perfume-webpack-plugin)

[perfume.js](https://github.com/Zizzamia/perfume.js)的Webpack插件

[English](./README.md) | 简体中文

## 安装:

首先安装npm包

```console
npm i perfume-webpack-plugin -D
```
### 导入库
```javascript
import PerfumeWebpackPlugin from 'perfume-webpack-plugin'
```
### 如果使用CommonJS的方式导入
```javascript
const PerfumeWebpackPlugin = require('perfume-webpack-plugin').default
```

## 示例:

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

## 默认选项:
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
