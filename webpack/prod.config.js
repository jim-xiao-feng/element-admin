const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require("terser-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  entry: {
    app: path.resolve(__dirname, '../src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist/code'),
    filename: '[name].bundle.[contenthash].js',
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [`!${path.join(__dirname, '../dist/dll')}`, //  不删除dll文件夹
      path.join(__dirname, '../dist/code')],  // 删除code文件夹
    }),
    new webpack.DefinePlugin({
      env: JSON.stringify('production')
    }),
    new HtmlWebpackPlugin({
      title: '管理系统',
      template: 'src/index.html',
      // 这里列出要加入html中的js文件
      dlls: '../dll/vue.dll.js',
    }),
    // new webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname, '../dist/dll/vue.manifest.json')
    // }),
  ],
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),   // 压缩css
      new TerserWebpackPlugin({        // 压缩js
        cache: true,
        parallel: 4  // 开启多进程压缩
      })
    ]
  }
}

module.exports = webpackMerge(baseConfig, prodConfig)