const webpack = require('webpack');
const base = require('./webpack.base.conf.js');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const path = require('path');

module.exports = merge(base, {
	mode: 'production',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, '../dist'),
	},
	optimization: {
    splitChunks: {
      chunks: 'initial', // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /\/node_modules\//,
          priority: -10,
        },
        'react-vendor': {
          test: (module, chunks) => /react/.test(module.context),
          priority: 1,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: false,
        },
      }),
    ],
	},
	// 解决rom UglifyJs Unexpected token: keyword «function», expected: punc «;» 的办法： 1.babel-loader去掉 exclude: /node_modules/ 2. uglifyjs-webpack-plugin插件需要升级到uglifyjs-webpack-plugin": "^1.3.0"
	plugins: [
		new ParallelUglifyPlugin({
      test: /\.jsx?/,
      cacheDir: '../dist/cache',
      workerCount: 10,
			sourceMap: false,
      uglifyES: {
        output: {
          // 最紧凑的输出
          beautify: false,
          // 删除所有的注释
          comments: false,
        },
        compress: {
          // 在UglifyJs删除没有用到的代码时不输出警告
          warnings: false,
          // 删除所有的 `console` 语句，可以兼容ie浏览器
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true,
        },
      },
    }),
		new webpack.DefinePlugin({
			'BASE_URL': JSON.stringify('http://www.mingyangli.com:7001')
		}),
		new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip', // 算法
      test: new RegExp(
        '\\.(js|css|less|scss)$' // 压缩 js 与 css
      ),
      // threshold: 10240,//只处理比这个值大的资源。按字节计算
      // minRatio: 0.8//只有压缩率比这个值小的资源才会被处理
    }),
	]
})