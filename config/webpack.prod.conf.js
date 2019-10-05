const webpack = require('webpack');
const base = require('./webpack.base.conf.js');
const merge = require('webpack-merge');
// 压缩js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
// 压缩css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

module.exports = merge(base, {
	mode: 'production',
	output: {
		filename: 'main.js',
    path: path.resolve(__dirname, '../dist'),
    // chunkFilename: '[name].min.js'
	},
	optimization: {
    splitChunks: { // 用于分包将重复引入的模块打包到一个文件里面
      chunks: 'initial', // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
      minSize: 30000, // 分离为多个chunks后的最小文件大小。该值越小，则分离的文件越多
      minChunks: 1, // 分离前，该块被引入的次数（也就是某个js文件通过import或require引入的次数）
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: '[name].min.js',
      cacheGroups: {
        'node_modules_vendors': {
          test: /node_modules/,
          priority: -10,
          minSize: 30000,  // node_modules打包出来的文件比较大
          filename: 'node_modules.min.js',
          name: 'node_modules.min.js'
        },
        'react-vendor': {
          test: (module, chunks) => /react/.test(module.context),
          priority: 1,
          filename: 'react.min.js',
          name: 'react.min.js',
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
          filename: '[id].min.css',
        },
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    // minimize: true,
    // 压缩js和css
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
      }),
      new OptimizeCSSAssetsPlugin()
    ],
	},
	// 解决rom UglifyJs Unexpected token: keyword «function», expected: punc «;» 的办法： 1.babel-loader去掉 exclude: /node_modules/ 2. uglifyjs-webpack-plugin插件需要升级到uglifyjs-webpack-plugin": "^1.3.0"
	plugins: [
    // 压缩js
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
    // 压缩css
    new OptimizeCSSAssetsPlugin(),
		new webpack.DefinePlugin({
			'BASE_URL': JSON.stringify('https://www.mingyangli.com')
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
