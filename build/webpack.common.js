/*
 * @Author: chenwei 
 * @Date: 2019-01-27 14:04:38 
 * @Last Modified by: chenwei
 * @Last Modified time: 2019-01-27 20:34:45
 */

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');   // html处理插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  // 提取CSS为单独文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');  // CSS模块资源优化插件
const PurifyCssWebpack = require('purifycss-webpack');  // 消除冗余代码
const glob = require('glob');   // 扫描插件

module.exports = {
  entry: {
    app: './src/index.js',
    // another: './src/another-module.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('dist')
  },
  module: {
    rules: [
      // 处理css文件
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader?modules',
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: __dirname
              }
            }
          }
        ]
      },
      // 处理sass文件
      {
        test: /\.(sass|scss)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader // 解耦CSS
          },
          {
            loader: 'css-loader?modules',
            options: {
              importLoaders: 2  // 指定css-loader处理前最多经过的loader个数
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: __dirname
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      // 处理js文件
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 清空文件夹
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve()
    }),
    // 生成html
    new HtmlWebpackPlugin({
      // title: 'Production',                  // 页面title, 指定template时无效
      template: './src/index.html',         // 模版地址
      filename: 'index.html',               // 输出文件名
      minify: {
        removeComments: true,               // 移除注释
        collapseWhitespace: true,           // 压缩html中的空白文本节点
        collapseInlineTagWhitespace: true,  // 压缩行空白，保留&nbsp;空格
      }
    }),
    // 提取CSS
    new MiniCssExtractPlugin({
      filename: "[name].css"                // 设置独立提取出的CSS的文件名
    }),
    new PurifyCssWebpack({
      paths: glob.sync(path.resolve( "./src/*.html"))
    })
  ],
  optimization: {
    // 压缩CSS文件，mode='production'时生效
    minimizer: [
      new OptimizeCssAssetsPlugin()
    ],
    // 代码分割
    splitChunks: {
      chunks: "initial",          // async: 作用于异步模块，all: 所有模块, initial: 初始化模块
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '-',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}