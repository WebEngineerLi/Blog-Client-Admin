const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const base = require('./webpack.base.conf.js');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(base, {
	devtool: 'source-map',
  mode: 'production',
  output: {
    filename: 'main.js',
		path: path.resolve(__dirname, '../dist'),
	},
  optimization: {
    splitChunks: {
			chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
    },
  },
	plugins: [
		new UglifyJsPlugin({
      exclude: '/node_modules/',
      sourceMap: true,
      uglifyOptions: { ecma: 8 },
		})
	]
})