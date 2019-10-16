const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.less'],
    alias: {
      'vue': 'vue/dist/vue.esm.js', // 默认vue用的runtime模式，但它不支持template
      'features': path.resolve(__dirname, '../src/features')
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader',
    }, {
      test: /\.(png|jpg|gif|svg)/,
      loader: 'url-loader?limit=8192',
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '管理系统',
      template: 'src/index.html',   // 采用本地的template（默认会生成）
      inject: 'body',
      filename: 'index.html',
    }),
    new VueLoaderPlugin()
  ],
}