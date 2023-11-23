/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/01.png":
/*!***************************!*\
  !*** ./src/assets/01.png ***!
  \***************************/
/***/ ((module) => {

module.exports = `01_951cc.png`

/***/ }),

/***/ "./src/assets/index.css":
/*!******************************!*\
  !*** ./src/assets/index.css ***!
  \******************************/
/***/ ((module) => {

const style = document.createElement("style")
  style.innerHTML = `body {
  background-color: black;
}
`
  document.head.appendChild(style)
  module.exports = `body {
  background-color: black;
}
`

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*
 * @Author: wy
 * @Date: 2023-11-23 10:10:13
 * @LastEditors: wy
 * @LastEditTime: 2023-11-23 10:59:15
 * @FilePath: /笔记/webpack-theory/02_loaders/src/index.js
 * @Description:
 */

const content = __webpack_require__(/*! ./assets/index.css */ "./src/assets/index.css");
// 导入图片
const imgSrc = __webpack_require__(/*! ./assets/01.png */ "./src/assets/01.png");
const img = document.createElement('img');
img.src = imgSrc;
document.body.appendChild(img);

})();

/******/ })()
;
//# sourceMappingURL=main.js.map