const path = require('path');

module.exports = {
  entry: {
    'perfume-main': './src/assets/perfume-main.js',
    'perfume-worker': './src/assets/perfume-worker.js',
  },
  mode: 'development',
  devtool: 'hidden-source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.jsx', '.js' ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/assets'),
    globalObject: 'this',
  }
};
