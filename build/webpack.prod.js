/*
 * @Author: chenwei 
 * @Date: 2019-01-27 14:32:51 
 * @Last Modified by: chenwei
 * @Last Modified time: 2019-01-30 17:29:15
 */
'use strict'

const merge = require('webpack-merge');
const common = require('./webpack.base.js');

module.exports = merge(common, {
  mode: 'production',
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false,
    chunkModules: false
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 30000000,
    maxEntrypointSize: 50000000
  }
})