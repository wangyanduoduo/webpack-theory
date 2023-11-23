/*
 * @Author: wy
 * @Date: 2023-11-23 14:13:13
 * @LastEditors: wy
 * @LastEditTime: 2023-11-23 15:01:42
 * @FilePath: /笔记/webpack-theory/03_plugins/plugins/fileList-plugins.js
 * @Description:
 */
class FileListPlugin {
  constructor(filename = 'fileList.text') {
    this.filename = filename;
  }
  apply(compiler) {
    compiler.hooks.emit.tap('file-plugin', (compilation) => {
      const { assets } = compilation;
      const fileLists = [];
      for (let key in assets) {
        let content = `[${key}]
大小：${assets[key].size() / 1000}KB`;
        fileLists.push(content);
      }
      let str = fileLists.join('\n\n');
      assets[this.filename] = {
        source() {
          return str;
        },
        size() {
          return str.length;
        },
      };
    });
  }
}

module.exports = FileListPlugin;
