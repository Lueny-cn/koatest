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
    let email = baseNames[randomIdx] + suffix;
    let roles = ["asker"];
    if (suffix%3==0){
        roles.push("admin");
    }
    if (suffix%5===0){
        roles.push("teacher");
    }
    //插入新数据
    let doc = {
        email: email,
        password: "dasiwoyebushuo",
        roles: roles
    };

    let ret = yield new UserModel(doc).save();
    this.body = ret;
};

exports.signup = function *() {
    let _user = this.request.body || this.request.query;
    let email = _user.email;
    let password = _user.password;
    if(!email || !password) return;
    let userExist = yield UserModel.findByEmail(email);
    if (userExist) {
        this.body = {
            code: 400,
            result: 'error',
            msg: '邮箱已经被注册'
        }
        return;
    }
    //插入新数据
    let user = {
        email: email,
        password: password
    };
    let userInfo = yield UserModel.add(user);
    this.body = {
        code: 200,
        type: 2,
        msg: '注册成功',
        email: userInfo.email
    };
};

exports.signin = function* () {
    let _user = this.request.body;
    let email = _user.email;
    let password = _user.password;
    let userInfo = yield UserModel.findByEmail(email);
    if (!userInfo ||  userInfo.password !== password) {
        this.body = {
            result: 'error',
            msg: '邮箱或密码错误'
        }
        return ;
    }

    this.session.user = {
      email: userInfo.email
    };

    this.body = {
        code: 200,
        type: 1,
        msg: '登录成功',
        email: userInfo.email
    }

};

exports.logout = function* () {
    delete this.session.user;
    // this.redirect('back');
     this.body = {
        code: 200,
         type: 3,
        msg: '退出成功'
    };
};

//修改用户资料 post
exports.update =  function* () {
    let user = this.request.body,
        userInfo = yield UserModel.findByEmail(user.email);
    if(!userInfo) {
        this.body = {
            code: 400,
            msg: '所填邮箱尚未注册'
        };
    } else {
        let data = {
            nikename: user.nikename,
            gender: user.gender,
            tel: user.tel,
            birthday: user.birthday,
            school: user.school,
            education: user.education
        };

        let result = yield UserModel.updateByEmail(user.email, data);

        if(result) {
            this.body = {
                code: 200,
                data: result
            };
        } else {
            this.body = {
                code: 500,
                msg: "服务器错误"
            }
        }
    }
}

// exports.userById = function *(userId) {

//    console.log('session',this.session)
//    console.log('session::: user',this.session.user)
    
//     if(userId.match(/^[0-9a-fA-F]{24}$/)) {
//         let result = yield UserModel.findById(userId);
//         if(result) {
//             this.body = {
//                 code: 200,
//                 data: result
//             }
//         } else {
//             this.body = {
//                 code: 500,
//                 msg: "服务器错误"
//             }
//         }
//     } else {
//         this.body = {
//             code: 400,
//             msg: "输入数据有误"
//         }
//     }
// }

exports.getUserDetail= function *() {

   console.log('session',this.session)
   console.log('session::: user',this.session.user)
    
    if(this.session && this.session.user) {
        let result = yield UserModel.findByEmail(this.session.user.email);
        if(result) {
            this.body = {
                code: 200,
                data: result
            }
        } else {
            this.body = {
                code: 500,
                msg: "服务器错误"
            }
        }
    } else {
        this.body = {
            code: 400,
            msg: "用户未登录"
        }
    }
}


exports.isLogin = function *(next) {
    let session = this.session;
    if(session && session.user) {
        this.body = {
            type: 1,
            user: session.user
        }
    } else {
        this.body = {
            type: 0,
            msg: "用户未登录"
        }
    }
    yield next;
}
