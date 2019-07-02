const base = require('./webpack.base.conf');
const merge = require('webpack-merge');

module.exports = merge(base, {
	module: {
		devtool: 'inline-source-map',
		mode: 'development',
		devServer: {
			hot: true,
			contentBase: path.resolve(__dirname, 'dist'),
			port: '8888',
			inline: true,
			open: true,
		},
	}
})