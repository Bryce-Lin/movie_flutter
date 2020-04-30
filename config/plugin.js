/*
 * @Author: your name
 * @Date: 2020-04-22 16:16:36
 * @LastEditTime: 2020-04-25 10:29:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-example\config\plugin.js
 */
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mysql : {
    enable: true,
    package: 'egg-mysql'
  }
};
