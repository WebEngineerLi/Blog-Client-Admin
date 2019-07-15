const webpack = require('webpack');
const base = require('./webpack.base.conf.js');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = merge(base, {
	mode: 'production',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, '../dist'),
	},
	optimization: {
		splitChunks: {
			chunks: "async", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
			maxSize: 300,
		},
		minimizer: [
			new UglifyJsPlugin({
				uglifyOptions: {
					compress: false
				}
			})
		]
	},
	plugins: [
		new UglifyJsPlugin({
			sourceMap: false,
			uglifyOptions: {
				ecma: 8
			}
		}),
		new webpack.DefinePlugin({
			BASE_URL: JSON.stringify('http://39.97.243.148:7001')
		})
	]
})