/*
 * @Author: wy
 * @Date: 2023-11-24 09:33:02
 * @LastEditors: wy
 * @LastEditTime: 2023-11-27 13:24:25
 * @FilePath: /笔记/webpack-theory/04_setting/src/index.js
 * @Description:
 */
// import $ from './jq';
import $ from 'jquery';
// import lodash from 'lodash';
const img1 = require('./assets/01.png').default;
const img = document.createElement('img');
img.src = img1;
document.body.appendChild(img);

export default {
  a: 1,
};
