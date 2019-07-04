const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const handler = (percentage, message, ...args) => {
  // e.g. Output each progress message directly to the console:
	console.info(`[${percentage.toFixed(2) * 100}%]`, message, args);
};
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../dist'),
	},
	resolve: {
		alias: {
			Utils: path.resolve(__dirname, '../src/utils')  // 命名
		},
		extensions: ['.wasm', '.mjs', '.js', '.json']  // 省略扩展
	},
	optimization: {
    splitChunks: {
			chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
    },
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
              publicPath: 'static/images/'
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
        test: /\.css$/,
				exclude: '/node-modules',
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../',
						}
					}, {
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[path]__[name]__[local]__[hash:base64:6]'
						}
					},
					'postcss-loader'
				]
      },
      {
        test: /\.less$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../',
						}
					}, {
						loader: 'css-loader',
						// options: {
						// 	modules: true,
						// 	localIdentName: '[path]__[name]__[local]__[hash:base64:6]'
						// }
					},
					'postcss-loader',
					{
            loader: 'less-loader',
            options: {
              modifyVars: {
                'primary-color': '#1DA57A',
                'link-color': '#1DA57A',
                'border-radius-base': '2px',
                 // or
                //  'hack': `true; @import "your-less-file-path.less";`, // Override with less file
               },
              javascriptEnabled: true
            }
          }
				]
      },
      {
        test: /\.scss$|\.sass$/,
				exclude: '/node-modules',
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../',
						}
					}, {
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[path]__[name]__[local]__[hash:base64:6]'
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
      template: path.join(__dirname, '../src/template.html') // 指定模板路径
    }),
    new Webpack.ProgressPlugin(handler),
		// new MiniCssExtractPlugin({
		// 	filename:"main.css"
		// })
		new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
}
