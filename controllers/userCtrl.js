const UserModel = require('../models/user');

//列出所有用户数据，支持分页
exports.list = function *(){
    let page = this.query.page || 1;
    let limit = 10;
    let skip = (page-1)*limit;
    // this.body = yield UserModel.find().skip(skip).limit(limit);
    this.body = yield UserModel.find();
};

//插入一条新数据，实际应用中应该读取客户端POST数据，本示例仅仅模拟
exports.insert = function *(){
    //下面都是随机造假数据
    let suffix = Math.round(Math.random()*100);
    let baseNames = ["Sam", "Tom", "Jimmy", "Jack", "Kate", "Emma"];
    let randomIdx = Math.floor(Math.random()*baseNames.length);
    let username = baseNames[randomIdx] + suffix;
    let roles = ["asker"];
    if (suffix%3==0){
        roles.push("admin");
    }
    if (suffix%5===0){
        roles.push("teacher");
    }
    //插入新数据
    let doc = {
        username: username,
        password: "dasiwoyebushuo",
        roles: roles
    };

    let ret = yield new UserModel(doc).save();
    this.body = ret;
};

exports.signup = function *() {
    let _user = this.request.body || this.request.query;
    let username = _user.username;
    let password = _user.password;

    if(!username || !password) return;
    let userExist = yield UserModel.findByUsername(username);
    if (userExist) {
        this.body = {
            code: 400,
            result: 'error',
            msg: '用户名已经存在'
        }
        return;
    }
    //插入新数据
    let user = {
        username: username,
        password: password
    };
    let userInfo = yield UserModel.add(user);
    this.body = {
        code: 200,
        msg: '注册成功',
        name: userInfo.username
    };
    this.redirect('/login')
}

exports.signin = function* () {
    let _user = this.request.body;
    let username = _user.username;
    let password = _user.password;
    let userInfo = yield UserModel.findByUsername(username);
    if (!userInfo ||  userInfo.password !== password) {
        this.body = {
            result: 'error',
            msg: '用户名或密码错误'
        }
        return ;
    }

    this.session.user = {
      username: userInfo.username
    };

    this.body = {
        statu_code: 200,
        msg: '登录成功',
        name: userInfo.username
    }

}

exports.logout = function* () {
    delete this.session.user;
    // this.redirect('back');
     this.body = {
        statu_code: 200,
        msg: '退出成功'
    };
}

