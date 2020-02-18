const path = require('path');

module.exports = {
  entry: {
    'perfume-main': './src/assets/perfume-main.ts',
    'perfume-worker': './src/assets/perfume-worker.ts',
    // 'perfume-analytics': './src/assets/perfume-analytics.ts',
  },
  mode: 'development',
  devtool: 'hidden-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          }
        }],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/assets'),
    globalObject: 'this',
  }
};
