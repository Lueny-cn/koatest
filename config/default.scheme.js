var validator = require('validator');
var crypto = require('crypto');

module.exports = {
    "(GET|POST) /user/signup": {
        "request": {
            "session": checkNotLogin
        }
    },
    "POST /user/signup": {
        "request": {
            "body": checkSignupBody
        }
    },
    "(GET|POST) /user/signin": {
        "request": {
            "session": checkNotLogin
        }
    },
    "POST /user/signin": {
        "request": {
            "body": checkSigninBody
        }
    },
    "(GET|POST) /create": {
        "request": {
            "session": checkLogin
        }
    },
    // "GET /subjectAll": {
    //     "request": {
    //         "session": checkLogin
    //     }
    // },
    // "GET /subjectItemType/list": {
    //     "request": {
    //         "session": checkLogin
    //     }
    // },
    // "GET /subjectType/list": {
    //     "request": {
    //         "session": checkLogin
    //     }
    // },
    // "POST /subjectType/update": {
    //     "request": {
    //         "session": checkLogin
    //     }
    // },
    // "POST /subjectItemType/create": {
    //     "request": {
    //         "session": checkLogin
    //     }
    // },
    // "POST /subjectItemType/update": {
    //     "request": {
    //         "session": checkLogin
    //     }
    // },
    "POST /create": {
        "request": {
            "body": checkCreateBody
        }
    },
    "POST /topic/:id": {
        "request": {
            "session": checkLogin,
            "body": checkReplyTopic
        }
    }
};

function md5 (str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

function checkNotLogin() {
    if (this.session && this.session.user) {
       this.body = {
           result: 'error',
           msg: "用户已经登录"
       }
        return false;
    }
    return true;
}

function checkLogin() {
    if (!this.session || !this.session.user) {
        // this.flash = {error: '未登录!'};
        this.body = {
            code: 1,
            msg: "用户未登录"
        }

        return false;
    }
    return true;
}

function checkSignupBody() {
    var body = this.request.body;
    var flash;
    if (!body || !body.username) {
        flash = {error: '请填写用户名!'};
    }
    // else if (!body.email || !validator.isEmail(body.email)) {
    //   flash = {error: '请填写正确邮箱地址!'};
    // }
    // else if (!body.password) {
    //   flash = {error: '请填写密码!'};
    // }
    // else if (body.password !== body.re_password) {
    //   flash = {error: '两次密码不匹配!'};
    // }
    // else if (!body.gender || !~['男', '女'].indexOf(body.gender)) {
    //   flash = {error: '请选择性别!'};
    // }
    // else if (body.signature && body.signature.length > 50) {
    //   flash = {error: '个性签名不能超过50字!'};
    // }
    if (flash) {
        this.flash = flash;
        this.redirect('back');
        return false;
    }
    body.username = validator.trim(body.username);
    // body.email = validator.trim(body.email);
    body.password = md5(validator.trim(body.password));
    return true;
}

function checkSigninBody() {
    var body = this.request.body;
    var flash;
    if (!body || !body.username) {
        flash = {error: '请填写用户名!'};
    }
    else if (!body.password) {
        flash = {error: '请填写密码!'};
    }
    if (flash) {
        this.flash = flash;
        this.redirect('back');
        return false;
    }
    body.username = validator.trim(body.username);
    body.password = md5(validator.trim(body.password));
    return true;
}

function checkCreateBody() {
    var body = this.request.body;
    var flash;
    if (!body || !body.title || body.title.length < 10) {
        flash = {error: '请填写合法标题!'};
    }
    else if (!body.tab) {
        flash = {error: '请选择版块!'};
    }
    else if (!body.content) {
        flash = {error: '请填写内容!'};
    }
    if (flash) {
        this.flash = flash;
        this.redirect('back');
        return false;
    }
    body.title = validator.trim(body.title);
    body.tab = validator.trim(body.tab);
    body.content = validator.trim(body.content);
    return true;
}

function checkReplyTopic() {
    var body = this.request.body;
    var flash;
    if (!body || !body.topic_id || !validator.isMongoId(body.topic_id)) {
        flash = {error: '回复的帖子不存在!'};
    }
    else if (!body.content) {
        flash = {error: '回复的内容为空!'};
    }
    if (flash) {
        this.flash = flash;
        this.redirect('back');
        return false;
    }
    body.content = validator.trim(body.content);
    return true;
}