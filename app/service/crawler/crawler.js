/*
 * @Author: your name
 * @Date: 2020-04-25 10:39:54
 * @LastEditTime: 2020-04-29 18:13:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \egg-example\app\service\crawler\crawler.js
 */
const Service = require('egg').Service;
var Crawler = require("crawler");
class crawlerMovie extends Service {
    constructor (ctx) {
        super(ctx);
    this.c = new Crawler({
            maxConnections : 10,
            callback : async function (error, res, done) {
                if(error){
                    console.log(error);
                }
                done();
            }
        });
    }
    // update table set 字段=值  where id in (select top 100 from table)
    async crawlerMovie () {

        this.c.queue({
            url:'http://www.kanxi123.com',
            callback: async (error,res,done)=>{
                if(error) {
                    console.error(error)
                }else {
                    var $ = res.$;
                    // $ is Cheerio by default
                        //a lean implementation of core jQuery designed specifically for the server
                        for(let i = 0 ;i <$(".balist_thumb").length;i++) {
                            let item = $(".balist_thumb")[i]
                            const title  = item.attribs.title
                            const image = item.attribs['data-background']
                            const mid   = item.attribs.href.replace(/[^\d+]/g,'')
                            const result = await this.app.mysql.insert('movie_hot', { image,title,mid});
                            console.log(result)
                    }
                }
        }});
    }

    async crawlerNew (page) {

        let url = page< 2 ? 'http://www.kxkx.tv/zuixin/' : `http://www.kxkx.tv/zuixin/${page}/`
            this.c.queue({
                url:url,
                callback: async (error,res,done)=>{
                    if(error) {
                        console.error(error)
                    }else {
            
                    
                        var $ = res.$;
                        // $ is Cheerio by default
                            //a lean implementation of core jQuery designed specifically for the server
                        const List = $(".lazy-load-img");
                        // console.log(List[0])        
                        // const mapList = new Map();
                        
                            for(let i = 0 ;i <List.length;i++) {
                                  
                                let definition = List.eq(i).next().next().text();
                                let image = List.eq(i).attr('_src');
                                let updatetime = List.eq(i).next().next().next().text();
                                let mid = $('.m_head_new2').eq(i).find('#m_head_new5').children().attr('href').replace(/[^\d+]/g,'')
                                const title = $('.m_head_new2').eq(i).find('#m_head_new5').children().text()
                                const crawlerPath = $('.m_head_new2').eq(i).find('#m_head_new5').children().attr('href')
                                // let mid = $()
                                let param = {
                                    image,
                                    title,
                                    path:'',
                                    mid,
                                    updatetime,
                                    definition,
                                    crawlerPath
                                }
                                const result = await this.app.mysql.insert('movie_news', param);
                        }
                        if(page===10) {
                            return 
                        }else {
                            this.crawlerNew(page+1)
                        }
                        // console.log(mapList)
                    }
            }});
    }

    async crawlerPath () {
        // this.ctx.body = 'aaaa'
       let row = await this.app.mysql.select('movie_news')
    //    this.ctx.body = 'aaaaccc'
    //    console.log(row[37].mid,66212621)
    //    return
    const getawit = (i)=>{
      return  new Promise((resolve,reject)=>{
            this.c.queue({
                url:'http://www.kxkx.tv/'+row[i].crawlerPath,
                callback: async (error,res,done)=>{
                    if(error) {
                        console.error(error)
                    }else {
                        var $ = res.$;
                        // $ is Cheerio by default
                            //a lean implementation of core jQuery designed specifically for the server
                            let jumpUrl =  ''
                            let text = '' 
                        const List = $(".m_html_p3");
                        for(let j = 0;j<List.length;j++) {
                            let dom = List.eq(j);
                            jumpUrl = dom.find('a').attr('href')
                            text = dom.text();
                            console.log('jinru:'+row[i].mid)
                           let data =  await this.findPath(row[i].mid,'http://www.kxkx.tv/'+jumpUrl,text)
                           resolve(data)
                           console.log(data,'回来了')
                        }
                        
                        // console.log(List[0])        
                        // const mapList = new Map();
                        // console.log(mapList)
                    }
            }});
        })
    }
        for(let i =0;i<row.length;i++) {
            console.log(row[i])
           let data = await getawit(i)
           console.log('继续')
        }
        
    }

    async findPath (id,jumpUrl,text) {
        const row = await this.app.mysql.select('movie_detail',{where:{
            mid:id
        }});
         console.log(row,jumpUrl,text)
        
        return new Promise((resolve,reject)=>{
console.log('1313131')
            this.c.queue({
                url:jumpUrl,
                callback: async (error,res,done)=>{
                    console.log('err')
                    if(error) {
                        console.error(error)
                    }else {
                        var $ = res.$;
                        console.log('进入')
                        // $ is Cheerio by default
                            //a lean implementation of core jQuery designed specifically for the server
                        const path = $('iframe').attr('src').split('=')[1]
                        let param = {
                            mid:id,
                            'video_path':path,
                            description:'',
                            'lit_m':text
                        }
                        if(!row.length) {
                            console.log('新增')
                            const result = await this.app.mysql.insert('movie_detail', param); // 在 post 表中，插入 title 为 Hello World 的记录
                            resolve(result)
                            console.log(result,'新增成功')
                        }else {
                            console.log('新增2')
                            let  prm = {
                                'video_path':row[0]['video_path'] += ','+path,
                                'lit_m' :row[0]['lit_m'] +=  ","+text
                            }
                            const options = {
                                where: {
                                    mid:id
                                }
                            }
                        
                        const result = await this.app.mysql.update('movie_detail', prm, options); // 更新 posts 表中的记录
                            console.log(result,'更新成功')
                            resolve(result)
                        }
                        
                        
                        // console.log(List[0])        
                        // const mapList = new Map();
                        // console.log(mapList)
                    }
            }});
        })
    }

}
  
  module.exports = crawlerMovie;