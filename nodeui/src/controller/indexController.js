const cheerio = require('cheerio');
const fetch = require('node-fetch');
const url = require('url');
const {IndexService,UtilService} = require('../services');


const IndexController = {
  get() {
      return async (ctx, next) => {
          let params = url.parse(ctx.url,true)
          console.log('params',params)
          let path = params.query.url||'';
          let selector = params.query.selector || '';
          if(!path.length){
              return
          }
          let domain = '';
          let domain_name = UtilService.getDomainNameByUrl(path);
          console.log('domain_name:',domain_name)
          domain = UtilService.getDomainByDomainName(domain_name);
          console.log('domain:',domain)
          try{
              let res = await fetch(path);
              let html = await res.text();
              let fmtHtml = IndexService.format(domain_name,domain,html,selector);
              str = `<p>原文链接：<a href="${path}">${path}</a></p>` + fmtHtml;
              ctx.contentType = 'text/html'
              ctx.body = str;
          }catch(err){
              console.warn('err',err)
          }
      };
  },
  test() {
      return async (ctx, next) => {
          ctx.body = 'test';
      };
  },
};

module.exports = IndexController;