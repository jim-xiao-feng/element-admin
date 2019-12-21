const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./base.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  entry: {
    app: path.resolve(__dirname, '../src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new MiniCssExtractPlugin({      // 分离css代码
      filename: 'css/[name].css',
    })
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      },
      'css-loader',
      {
        loader: 'postcss-loader', // 给css加-webkit-前缀
        options: {
          plugins: [require('autoprefixer')]
        }
      }
    ]}, {
      test: /\.less$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      },
      'css-loader',
      {
        loader: 'postcss-loader', // 给css加-webkit-前缀
        options: {
          plugins: [require('autoprefixer')]
        }
      },
      'less-loader']
    }]
  }
}

module.exports = webpackMerge(baseConfig, prodConfig)