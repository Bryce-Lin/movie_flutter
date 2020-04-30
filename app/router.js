/*
 * @Author: your name
 * @Date: 2020-04-22 16:16:36
 * @LastEditTime: 2020-04-25 10:52:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-example\app\router.js
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */ 
      
module.exports = app => {
  const { router, controller } = app;
  // console.log(   app.config.appMiddleware,99)
  // console.log(app.middleware)
  // console.log(app.config.coreMiddleware)
  // console.log(app.config.coreMiddleware.unshift('report'),123)
  router.get('/', controller.crawler.crawler.index);
};
