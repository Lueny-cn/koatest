'use strict';
const koa = require('koa');
const route = require('./routes');
const mongoose = require('mongoose');
const session = require('koa-generic-session');
const logger = require('koa-logger');
const json = require('koa-json');
const views = require('koa-views');
const flash = require('koa-flash');
const scheme = require('koa-scheme'); 
const config = require('./config/config');
const MongoStore = require('koa-generic-session-mongo');
const cors = require('koa-cors');

const app = koa();
const merge = require('merge-descriptors');
const renderConf =  config.renderConf;
const core = require('./controllers/index');
merge(renderConf.locals || {}, core, false);

// global middlewares
app.use(views('views', {
  root: __dirname + '/views',
  default: 'ejs'
}));
app.use(require('koa-static')(__dirname + '/public'));

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());
app.use(cors(config.corsOption))

app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});
app.keys = ['secret', 'key'];
/* 服务器 保存session到mongo */
const sessionDB = {
    url: 'mongodb://localhost:27017/session'
}
app.use(session({
    store: new MongoStore(sessionDB)
}));

app.use(flash());
app.use(scheme(config.schemeConf));


// app.use(function *(next) {
//     console.log("1231231231321231", this);
//     yield next;
//     console.log("qqqqqqq,",this);
// });


route(app);

// 启动服务，监听3000端口
app.listen(config.port, ()=>{console.log(`Server started, please visit: http://127.0.0.1:${config.port}`);});

app.on('error', function(err, ctx){
  logger.error('server error', err, ctx);
});


// 以下MongoDB连接相关代码页可以独立出去，这里偷懒了
// 连接MongoDB, 在生产环境应该禁用autoIndex，因为会造成性能问题
// const connString = 'mongodb://localhost:27017/test';
mongoose.connect(config.mongodb, { /*config: { autoIndex: false }*/ });



// MongoDB连接成功后回调，这里仅输出一行日志
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + config.mongodb);
});

// MongoDB连接出错后回调，这里仅输出一行日志
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// MongoDB连接断开后回调，这里仅输出一行日志
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// 当前进程退出之前关闭MongoDB连接
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed through app termination');
        process.exit(0);
    });
});