const webpack            = require('webpack');
const merge              = require('webpack-merge');
const path               = require('path');
const baseConfig         = require('./webpack.base.config');
const parts              = require('./parts');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  performance: {
    hints: 'warning', // 'error' or false are valid too
    maxEntrypointSize: 100000, // in bytes
    maxAssetSize: 450000, // in bytes
  },

  output: {
    path: path.resolve('build'),
    chunkFilename: '[name].[chunkhash:8].js',
    filename: '[name].[chunkhash:8].js',
    // Match GitHub project name, loading the site from fs won't work
    publicPath: '/cricket/',
  },

  plugins: [
    new CleanWebpackPlugin('build', {
      root: path.resolve(__dirname, '../'),
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};

module.exports = merge([
  baseConfig,
  config,
  parts.css.extract(),
  parts.javaScript.minify(),
]);
