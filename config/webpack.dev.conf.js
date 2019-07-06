const path = require('path');
const base = require('./webpack.base.conf.js');
const merge = require('webpack-merge');

module.exports = merge(base, {
  devtool: 'eval-source-map',
  mode: 'development',
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    port: '1111',
    inline: true,
		open: true,
		historyApiFallback: true,
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
	}
})