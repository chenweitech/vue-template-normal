/*
 * @Author: chenwei 
 * @Date: 2019-01-27 14:13:55 
 * @Last Modified by: chenwei
 * @Last Modified time: 2019-02-18 20:43:57
 */
'use strict'

const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,                              // 开启HMR
    stats: 'minimal',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',    // 代理服务器地址
        pathRewrite: {'^/api': ''}          // 把URL中path部分的api移除
      }
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),        // 用于启动HMR时显示模块的相对路径
    new webpack.HotModuleReplacementPlugin(),// Hot Module Replacement
    new webpack.DefinePlugin({
      'process.env.MOCK': JSON.stringify('true')    // 是否开启MOCK
    })
  ]
})