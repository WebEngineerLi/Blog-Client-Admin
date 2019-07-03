const base = require('./webpack.base.conf.js');
const merge = require('webpack-merge');

module.exports = merge(base, {
  devtool: 'inline-source-map',
  mode: 'product',
})