/*
 * @Author: wy
 * @Date: 2023-11-23 10:48:46
 * @LastEditors: wy
 * @LastEditTime: 2023-11-23 11:21:05
 * @FilePath: /笔记/webpack-theory/02_loaders/loaders/img-loader.js
 * @Description:
 */
const loaderUtils = require('loader-utils');
function loader(source) {
  let content = '';
  const { limit = 1000, fileName = '[contenthash:5].[ext]' } =
    this.getOptions();
  if (source.byteLength > limit) {
    content = getFilePath.call(this, source, fileName);
  } else {
    content = getBase64(source);
  }

  return `module.exports = \`${content}\``;
}

loader.raw = true; // 表示返回原始的source，不需要转换成字符串

function getBase64(buffer) {
  return 'data:image/png;base64,' + buffer.toString('base64');
}

function getFilePath(buffer, name) {
  // 根据文件内容产生新的文件名
  const fileName = loaderUtils.interpolateName(this, name, {
    content: buffer,
  });
  // 文件放入打包后的文件中指定位置
  this.emitFile(fileName, buffer);
  return fileName;
}

module.exports = loader;
