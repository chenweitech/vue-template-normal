/*
 * @Author: chenwei 
 * @Date: 2019-01-27 14:13:55 
 * @Last Modified by: chenwei
 * @Last Modified time: 2019-01-29 12:05:39
 */
'use strict'

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    stats: 'minimal',
    port: 8080,
    proxy: {
      '/api/*': {
        target: 'http://localhost:8081'
      }
    }
  }
})