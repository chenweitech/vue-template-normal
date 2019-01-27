/*
 * @Author: chenwei 
 * @Date: 2019-01-27 19:12:31 
 * @Last Modified by:   chenwei 
 * @Last Modified time: 2019-01-27 19:12:31 
 */

const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    autoprefixer({
      browsers: [
        "> 1%"
      ]
    })
  ]
}