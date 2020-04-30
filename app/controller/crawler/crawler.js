/*
 * @Author: your name
 * @Date: 2020-04-25 10:44:36
 * @LastEditTime: 2020-04-29 16:39:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-example\app\controller\crawler\crawler.js
 */


'use strict';

const Controller = require('egg').Controller;

class crawlerController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'aa'
    ctx.service.crawler.crawler.crawlerPath()
  }
}

module.exports = crawlerController;
