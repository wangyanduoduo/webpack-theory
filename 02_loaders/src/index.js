/*
 * @Author: wy
 * @Date: 2023-11-23 10:10:13
 * @LastEditors: wy
 * @LastEditTime: 2023-11-23 10:59:15
 * @FilePath: /笔记/webpack-theory/02_loaders/src/index.js
 * @Description:
 */

const content = require('./assets/index.css');
// 导入图片
const imgSrc = require('./assets/01.png');
const img = document.createElement('img');
img.src = imgSrc;
document.body.appendChild(img);
