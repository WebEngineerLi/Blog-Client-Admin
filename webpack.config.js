const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');

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
		hot: true, // 热模块更替
		contentBase: path.resolve(__dirname, 'dist'),
		port: '8888',
		inline: true,
		open: true,
  },
  devtool: 'cheap-module-eval-source-map',
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
      },
      {
        test: /\.css/,
        exclude: '/node-modules',
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less/,
        exclude: '/node-modules',
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.scss/,
        exclude: '/node-modules',
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
		]
	},
	plugins: [
		new Webpack.HotModuleReplacementPlugin(), // 热模块更替，改完代码之后只需要局部代码重新编译刷新即可
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
      filename: 'index.html', // 最终创建的文件名: 注意相对的路径是output.path
      template: path.join(__dirname, 'src/template.html') // 指定模板路径
    })
	]
}