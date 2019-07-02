const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const handler = (percentage, message, ...args) => {
  // e.g. Output each progress message directly to the console:
  console.info(`[${percentage.toFixed(2) * 100}%]`, message, ...args);
};


module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		hot: true,
		contentBase: path.resolve(__dirname, 'dist'),
		port: '8888',
		inline: true,
		open: true,
	},
	module: {
		rules: [
			{
				test: /\.(png|svg|jpe?g|gif$)/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 500,  //是把小于500B的文件打成Base64的格式，写入JS
							name: '[name]_[hash:7].[ext]',
							outputPath: 'static/images/',
							publicPath: 'static/images'
						}
					}
				]
			},
			{
				test: /\.jsx?/,
				exclude: '/node_modules',
				use: [
					{
						loader: 'babel-loader',
					}
				]
			}
		]
	},
	plugins: [
		new Webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
      filename: 'index.html', // 最终创建的文件名: 注意相对的路径是output.path
      template: path.join(__dirname, 'src/template.html') // 指定模板路径
		}),
		new Webpack.ProgressPlugin(handler)
	]
}