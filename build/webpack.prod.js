/*
 * @Author: chenwei 
 * @Date: 2019-01-27 14:32:51 
 * @Last Modified by: chenwei
 * @Last Modified time: 2019-01-27 19:24:41
 */

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode:'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})