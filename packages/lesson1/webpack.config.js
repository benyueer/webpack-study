const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: false,
  // 入口
  entry: './src/index.js',
  //  出口
  output: {
    filename: 'built.js',
    path: path.resolve(__dirname, 'build')
  },
  // loader配置
  module: {
    rules: [
      {
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些loader 执行顺序从右到左
        use: [
          // 创建style标签，并插入到head标签中
          'style-loader', 
          // 将CSS文件变成commonJS模块，内容为样式字符串
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader', 'css-loader', 'less-loader'
        ]
      }
    ]
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  //  模式
  mode: 'development'
}