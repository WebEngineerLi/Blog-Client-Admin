const path = require('path');
const base = require('./webpack.base.conf.js');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge(base, {
  devtool: 'eval-source-map',
  mode: 'development',
  devServer: {
    hot: true,
		contentBase: './',
    port: '1111',
    inline: true,
		open: true,
		historyApiFallback: true,
    publicPath: '/',
    // proxy: {
    //   '/service/blog': {
    //     target: 'http://localhost:7001',
    //     changeOrigin: true,
    //   },
    //   '/service/upload': {
    //     target: 'http://localhost:7001',
    //   }
    // }
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				enforce: "pre",
				exclude: '/node_modules/',
				use: [{
					loader: 'eslint-loader',
					options: {
						fix: true
					}
				}],
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			// 'BASE_URL': JSON.stringify('http://localhost:7001')
			'BASE_URL': JSON.stringify('https://www.mingyangli.com')
		})
	]
})