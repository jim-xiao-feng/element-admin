const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js'
  },
  resolve: {  // 解析
    modules : [path.resolve(__dirname, '../src'), 'node_modules'],
    extensions: ['.js', '.vue', '.json', '.css', '.less'],
    alias: {
      'vue': 'vue/dist/vue.esm.js', // 默认vue用的runtime模式，但它不支持template
      'src': path.resolve(__dirname, '../src'),
      'features': path.resolve(__dirname, '../src/features'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'services': path.resolve(__dirname, '../src/services'),
    }
  },
  module: {  // 模块
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,  // 减小转化范围
      include: path.resolve(__dirname, '../src'),
      use: {
        loader: 'babel-loader',  // 将js转成es5
        options: {
          presets: ['@babel/preset-env'], // 转es6,比如const 箭头函数等
          plugins: ['@babel/plugin-transform-runtime'] // async/await等es7需要这个转化
        }
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.(png|jpg|gif|svg)/,
      loader: 'url-loader?limit=8192',
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)/,
      loader: 'file-loader',
    }]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}