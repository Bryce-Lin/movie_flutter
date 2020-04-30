/*
 * @Author: your name
 * @Date: 2020-04-22 16:16:36
 * @LastEditTime: 2020-04-25 11:03:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-example\config\config.default.js
 */
/* eslint valid-jsdoc: "off" */

'use strict';


/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
 
module.exports = appInfo => {
  


  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'movie',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1587543371695_9422';
  
  // add your middleware config here
  config.middleware = [
    'gzip' 
  ];
  
  config.gzip ={
    threshold : 1024
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
