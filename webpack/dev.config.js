const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./base.config')

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', // 开发推荐这个
  entry: {
    app: path.resolve(__dirname, '../src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js',
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader', // 给css加-webkit-前缀
          options: {
            plugins: [require('autoprefixer')]
          }
        }
      ]
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader',
    }],
  },
  devServer: {
    port: '3000',
    open: true,
    // 解决开发跨域问题
    proxy: {
      '/api':{
        target: 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    // history模式下的url会请求到服务器端，但是服务器端并没有这一个资源文件，就会返回404，所以需要配置这一项
		historyApiFallback: {
			index: '/index.html' //HTMLplugin生成的html默认为index.html
		}
  },
}

module.exports = webpackMerge(baseConfig, devConfig)
