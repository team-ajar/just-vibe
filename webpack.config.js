const path = require('path');

// this config can be in webpack.config.js or other file with constants
const API_URL = {
  production: JSON.stringify('prod-url'),
  development: JSON.stringify('dev-url')
}

// check environment mode
const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

// webpack config
module.exports = {
  mode: environment,
  entry: './client/src/index.tsx',
  devtool: 'inline-source-map',
  watch: true,
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, use: 'ts-loader', exclude: /node_modules/},
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/},
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
//   plugins: [
//     new webpack.DefinePlugin({
//         'API_URL': API_URL[environment]
//     })
// ],
};
