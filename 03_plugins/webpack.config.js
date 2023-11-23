/*
 * @Author: wy
 * @Date: 2023-11-23 14:13:34
 * @LastEditors: wy
 * @LastEditTime: 2023-11-23 14:52:00
 * @FilePath: /笔记/webpack-theory/03_plugins/webpack.config.js
 * @Description:
 */
const FileListPlugin = require('./plugins/fileList-plugins');
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  plugins: [new FileListPlugin('fileList.md')],
};
