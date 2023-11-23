/*
 * @Author: wy
 * @Date: 2023-11-23 10:14:24
 * @LastEditors: wy
 * @LastEditTime: 2023-11-23 10:28:49
 * @FilePath: /笔记/webpack-theory/02_loaders/loaders/style-loader.js
 * @Description:
 */
module.exports = function (source) {
  const code = `const style = document.createElement("style")
  style.innerHTML = \`${source}\`
  document.head.appendChild(style)
  module.exports = \`${source}\``; // 添加module.exports可以在别的js文件中，使用require('xx.css'),得到导出结果，不然是没有结果的

  return code;
};
