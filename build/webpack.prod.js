/*
 * @Author: chenwei 
 * @Date: 2019-01-27 14:32:51 
 * @Last Modified by: chenwei
 * @Last Modified time: 2019-01-28 17:00:13
 */
'use strict'

process.env.NODE_ENV = 'production';

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false,
    chunkModules: false
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 300000,
    maxEntrypointSize: 500000
  }
})