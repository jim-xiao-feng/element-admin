const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

/* 分离vue第三方插件 */
module.exports = {
  mode: "production",
  entry: {
    vue: ['vue/dist/vue.esm.js', 'vue-router', 'vuex', 'axios', 'js-cookie']
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dist/dll'),
    library: '[name]_dll_[hash]' // js库的方法名,libraryTarget默认是var，用script引用
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [`${path.join(__dirname, '../dist/dll')}`],
    }),
    new webpack.DllPlugin({
      // name要和output.library一致
      // 该字段就是输出manifest.json文件中name字段的值
      name: '[name]_dll_[hash]',
      path: path.resolve(__dirname, '../dist/dll', '[name].manifest.json')
    })
  ]
}