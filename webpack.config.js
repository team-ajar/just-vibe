const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

dotenv.config();

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
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, use: ['ts-loader'], exclude: /node_modules/},
      { test: /\.(js|jsx)$/, use: ['babel-loader'], exclude: /node_modules/},
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
        'API_URL': API_URL[environment]
    }),
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html'
    })
],
};
