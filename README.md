# perfume-webpack-plugin

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
