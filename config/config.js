var path = require('path');

module.exports={
  port: process.env.PORT || 3000,
  mongodb:'mongodb://localhost:27017/test',
  schemeConf: path.join(__dirname, './default.scheme'),
  renderConf: {
    root:  path.join(__dirname, '../views'),
    layout: false,
    viewExt: 'ejs',
    cache: true,
    debug: false,
    locals: {
      "name": "Node.js-club",
      "version": "0.0.1",
      "description": "一个分享与发现的地方",
      "locale": "zh-cn"
    }
  },
  corsOption: {
    origin:'http://localhost.test.com:6004',
    allowMethods:'GET,HEAD,PUT,POST,DELETE',
    exposeHeaders:'*',
    allowHeaders: '*',
    maxAge: 3600 * 24 * 365,
    credentials: true

  }

};