"use strict"
const route = require('koa-route');
const userController = require('../controllers/userCtrl');
const subjectController = require('../controllers/subjectCtrl');
const subjectTypeController = require('../controllers/subjectTypeCtrl');
const subjectItemTypeController = require('../controllers/subjectItemTypeCtrl');
const subjectTitleController = require('../controllers/subjectTitleCtrl')

module.exports = function (app) {
  // app.use(route.get(''), )
  
  app.use(route.get('/', function() {
    return this.render('index', {
      title: 'xxx首页'
    })
  }));

  app.use(route.get('/cate',  function *() {
     // return this.render('index', {
     //  title: 'hello ~~~'
     // })
    let links = [
      "<a href='/register'>注册</a>",
      "<a href='/user/list'>全部用户</a>"
    ];
    this.body = links.join("<br />");
  }));
  app.use(route.get('/register', function() {
    return this.render('registerForm', {
      title: '注册'
    })
  }));

  app.use(route.get('/login', function() {
    return this.render('loginForm', {
      title: '登录'
    })
  }));
  app.use(route.get('/createSubjectType', function() {
    return this.render('SubjectTypeForm', {
      title: '添加一级目录'
    })
  }));
  app.use(route.get('/updateSubjecttype', function() {
    return this.render('updateSubjectTypeForm', {
      title: '修改一级目录'
    })
  }));
  app.use(route.get('/createSubjectItem', function() {
    return this.render('subjectItemTypeForm', {
      title: '添加二级目录'
    })
  }));
  app.use(route.get('/updateSubjectItem', function() {
    return this.render('updateSubjectItemForm', {
      title: '修改二级目录'
    })
  }));
  app.use(route.get('/createSubject', function() {
    return this.render('createSubjectForm', {
      title: '添加题目'
    })
  }));
  app.use(route.get('/addSbTitle', function() {
    return this.render('subjectTitleForm', {
      title: '添加试题名'
    })
  }));

  app.use(route.post( '/user/signup', userController.signup ));
  app.use(route.post( '/user/signin', userController.signin ));
  app.use(route.get( '/user/logout', userController.logout ));
  app.use(route.get( '/user/isLogin', userController.isLogin ));
  app.use(route.get( '/user/list', userController.list ));
  app.use(route.get( '/subject/create', subjectController.insert )); //post
  app.use(route.post( '/subject/create', subjectController.insert )); //post
  app.use(route.get( '/subject/list', subjectController.list ));
  app.use(route.post( '/subjectType/create', subjectTypeController.insert )); //post
  app.use(route.post( '/subjectTitle/create', subjectTitleController.insert )); //post
  app.use(route.get( '/subjectTitle/list', subjectTitleController.list )); //post
  app.use(route.get( '/subjectTitle/:titleId', subjectTitleController.oneByTitleId )); //post
  app.use(route.get( '/subjectType/list', subjectTypeController.list ));
  app.use(route.post( '/subjectType/update', subjectTypeController.update ));
  app.use(route.post( '/subjectItemType/create', subjectItemTypeController.insert ));
  app.use(route.post( '/subjectItemType/update', subjectItemTypeController.update ));
  app.use(route.get( '/subjectItemType/list', subjectItemTypeController.listItem ));
  app.use(route.get( '/subjectAll', subjectItemTypeController.list ));
  app.use(route.get( '/subjectListByItemId/:titleId', subjectController.listByType ));
  app.use(route.get( '/subjectListBySbId/:subjectId', subjectController.listBySbId ));

}