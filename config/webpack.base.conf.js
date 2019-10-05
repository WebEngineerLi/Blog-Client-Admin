const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');
const chalk = require('chalk');
const handler = (percentage, message, ...args) => {
  // e.g. Output each progress message directly to the console:
  // console.info(`[${percentage.toFixed(2) * 100}%]`, message, args[0], args[1]);
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
    publicPath: '/'
  },
  resolve: {
    alias: {
      Utils: path.resolve(__dirname, '../src/utils')  // 命名
    },
    extensions: ['.wasm', '.mjs', '.js', '.json']  // 省略扩展
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
        loader: 'babel-loader',
        query: { compact: false }
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
              // modifyVars: {
              //   'primary-color': '#1DA57A',
              //   'link-color': '#1DA57A',
              //   // or
              //   //  'hack': `true; @import "your-less-file-path.less";`, // Override with less file
              // },
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
    new SimpleProgressPlugin({
      messageTemplate: [':bar', chalk.green(':percent'), ':msg'].join(' '),
      progressOptions: {
        complete: chalk.bgGreen(' '),
        incomplete: chalk.bgWhite(' '),
        width: 40,
        total: 100,
        clear: true
      }  
    }),

    // 将CSS提取为独立的文件的插件，对每个包含css的js文件都会创建一个CSS文件，支持按需加载css和sourceMap
    // 只能用在webpack4中，对比另一个插件
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].min.css"
    })
  ]
}
