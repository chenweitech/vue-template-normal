/*
 * @Author: chenwei 
 * @Date: 2019-01-27 14:04:38 
 * @Last Modified by: chenwei
 * @Last Modified time: 2019-01-29 16:51:28
 */
'use strict'
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');   // html处理插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  // 提取CSS为单独文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');  // CSS模块资源优化插件
// const PurifyCssWebpack = require('purifycss-webpack');  // 消除冗余代码
// const glob = require('glob');   // 扫描插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');   // vue-loader
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const autoprefixer = require('autoprefixer');

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: {
    app: ['@babel/polyfill','./src/main.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve('dist')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      // 处理vue文件
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      // 处理js文件
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      // 处理sass|scss|css文件
      {
        test: /\.(sa|sc|c)ss$/,
        include: [
          path.res
        ],
        include: [resolve('src'),resolve('/node_modules/element-ui/lib/')],
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3  // 指定css-loader处理前最多经过的loader个数
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: [
                    "> 1%"
                  ]
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: path.resolve('./src/assets/css/common.scss')
            }
          }
        ]
      },
      // 处理图片资源
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          fallback: 'file-loader',
          outputPath: 'img/'
        }
      },
      // 处理音频
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          fallback: 'file-loader',
          outputPath: 'media/'
        }
      },
      // 处理字体
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          fallback: 'file-loader',
          outputPath: 'fonts/'
        }
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
      template: './index.html',         // 模版地址
      filename: 'index.html',               // 输出文件名
      minify: {
        removeComments: true,               // 移除注释
        collapseWhitespace: true,           // 压缩html中的空白文本节点
        collapseInlineTagWhitespace: true,  // 压缩行空白，保留&nbsp;空格
      }
    }),
    // VueLoader
    new VueLoaderPlugin(),
    // clear useless errors
    // new PurifyCssWebpack({
    //   paths: glob.sync(path.resolve( "./*.html"))
    // }),
    // 提取CSS
    new MiniCssExtractPlugin({
      filename: "[name].css"                // 设置独立提取出的CSS的文件名
    }),
    new FriendlyErrorsWebpackPlugin()
  ],
  optimization: {
    // 压缩CSS文件，mode='production'时生效
    minimizer: [
      new OptimizeCssAssetsPlugin()
    ],
    // 代码分割
    splitChunks: {
      chunks: "initial",          // async: 作用于异步模块，all: 所有模块, initial: 初始化模块
      minSize: 300000,
      maxSize: 50000000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '.',
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
  },
}