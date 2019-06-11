const path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		main: './app/index.js'
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.(png|svg|jpe?g|gif$)/,
				use: [
					// {
					// 	loader: 'file-loader',
					// 	options: {
					// 		name: "[name].[ext]",
					// 		publicPath: "./dist/images/",
					// 		outputPath: 'images/'
					// 	}
					// }
					{
						loader: 'url-loader',
						options: {
							limit: 35000,
							name: './dist/images/[name].[ext]'
						}
					}
				]
			}
		]
	}
}