/*
 * @Author: wy
 * @Date: 2023-11-21 10:30:43
 * @LastEditors: wy
 * @LastEditTime: 2023-11-21 10:39:28
 * @FilePath: /笔记/webpack-theory/dist/my-main.js
 * @Description:
 */
(function (modules) {
  const moduleExports = {};
  function require(moduleId) {
    if (moduleExports[moduleId]) {
      return moduleExports[moduleId];
    }
    const func = modules[moduleId];
    const module = {
      exports: {},
    };
    const exports = module.exports;
    func(module, exports, require);
    const result = module.exports;
    moduleExports[moduleId] = result; // 缓存结果
    return result;
  }

  require('.src/index.js'); // 执行入口模块
})({
  './src/a.js': function (module, exports, require) {
    console.log('module a');
    module.exports = 'a';
  },
  '.src/index.js': function (module, exports, require) {
    console.log('module index');
    const a = require('./src/a.js');
    console.log(a);
  },
});
