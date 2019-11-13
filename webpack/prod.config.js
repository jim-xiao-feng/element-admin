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
      use: [MiniCssExtractPlugin.loader, 'css-loader']
    }, {
      test: /\.less$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
    }]
  }
}

module.exports = webpackMerge(baseConfig, prodConfig)