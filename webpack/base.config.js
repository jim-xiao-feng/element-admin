const os = require('os')
const path = require('path')
const HappyPack = require('happypack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
console.log('__dirname', __dirname, path.resolve(__dirname, '../src'))

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
      exclude: /node_modules/,  // 减小转化范围
      include: path.resolve(__dirname, '../src'),
      loader: 'happypack/loader?id=happyPackBabelLoader'
    }, {
      test: /\.vue$/,
      exclude: /node_modules/,  // 减小转化范围
      loader: 'vue-loader'
    }, {
      test: /\.(css|less)$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      },
      'happypack/loader?id=happyPackStyle'
      ]
    }, {
      test: /\.(png|jpg|gif|svg)/,
      loader: 'url-loader?limit=8192'
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)/,
      loader: 'file-loader'
    }]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({      // 分离css代码
      filename: 'css/[name].[contenthash].css',
    }),
    // Webpack是单线程模型的
    // HappyPack把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。
    new HappyPack({
      id: 'happyPackBabelLoader',
      loaders: [{
        loader: 'babel-loader',  // 将js转成es5
        options: {
          cacheDirectory: true, // 启用缓存
          presets: ['@babel/preset-env'], // 转es6,比如const 箭头函数等
          plugins: ['@babel/plugin-transform-runtime'] // async/await等es7需要这个转化
        }
      }],
      //代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
      threadPool: happyThreadPool,
      verbose: true, //允许 HappyPack 输出日志
    }),
    new HappyPack({
      id: 'happyPackStyle',
      loaders: [{
        loader: 'css-loader'
      }, {
        loader: 'postcss-loader', // 给css加-webkit-前缀
      }, {
        loader: 'less-loader'
      }],
      //代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
      threadPool: happyThreadPool,
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}