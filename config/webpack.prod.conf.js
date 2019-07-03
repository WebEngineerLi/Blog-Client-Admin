const base = require('./webpack.base.conf.js');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(base, {
	devtool: 'source-map',
	mode: 'production',
	plugins: [
		new UglifyJsPlugin({
			sourceMap: true
		})
	]
})