/*
 * @Author: wy
 * @Date: 2023-11-24 09:33:28
 * @LastEditors: wy
 * @LastEditTime: 2023-11-29 10:43:14
 * @FilePath: /笔记/webpack-theory/04_setting/webpack.config.js
 * @Description:
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: 'script/[name].[chunkhash:5].js',
    library: 'params',
    publicPath: '/', // 使用绝对路径
  },
  module: {
    noParse: /jquery/, // 不会再对jq进行解析操作，例如ast语法转换操作
    rules: [
      {
        test: /\.(png)|(jpg)|(jpeg)$/,
        use: [
          // css-loader 可以配置开启css module具体查看css-loader文档
          /**
           * post-css 插件(postcss.config.js)
           * -  postcss-preset-env
           *  - 自动厂商前缀（利用内置的autoprefixer，browserslist 配置兼容范围）
           *  - stage 标准阶段（0-4）数字越高越稳定
           *
           * - babel-loader 解析js(@babel/core)
           *    - babelrc 配置 {presets: [], plugins: []}
           *    - presets
           *      - @babel/preset-env
           *        - useBuiltIns: false | 'usage' // 处理新的api
           *        - corejs: 1 | 2 | 3 // 默认2 数字代表corejs的版本
           *
           *    - babel使用中需要的库
           *      - generator-runtime  处理类似async，await这样的新语法
           */

          {
            loader: 'url-loader',
            options: {
              limit: 5,
              name: 'imgs/[name].[hash:5].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'], // 查找目录，优先查找src下
  },
  // externals不会打包到最终的bundle.js中
  externals: {
    jquery: 'jQuery',
    // lodash: '_',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    // mini-css-extract-plugin 抽离css
  ],
  devServer: {
    port: 9000,
    open: ['/index.html'],
  },
};
