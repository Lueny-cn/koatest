const BannerModel = require('../models/banner');
const helper = require("../helper/helper");

//列出所有用户数据，支持分页
exports.list = function * (url) {
    // let page = this.query.page || 1; let limit = 10; let skip = (page-1)*limit;
    // this.body = yield UserModel.find().skip(skip).limit(limit);
    if (url == "all") {
        let result = yield BannerModel.find();
        this.body = {
            code: 200,
            data: result
        }
      
    } else {
        let result = yield BannerModel.find({"url": url});
        this.body = {
            code: 200,
            data: result
        }
    }

};

// @interface
/**
 * method: post
 * data: {
 *  titleId: 试题名id
 *  title: 试题名
 *
 * }
 */

//插入一条新数据，实际应用中应该读取客户端POST数据，本示例仅仅模拟
exports.insert = function * () {

    //验证权限
    helper.auth(this);

    let body = this.request.body;

    let resExist = yield BannerModel.find({"url": body.url});

    if (resExist.length !== 0) {
        this.body = {
            code: 302,
            msg: "url存在了"

        }
        return;
    }

    if (body && body.position) {
        let data = {
            "position": parseInt((body.position) || "0"),
            "url": body.url
        };

        let result = yield new BannerModel(data).save();
        this.body = {
            code: 200,
            data: result
        };
    } else {
        this.body = {
            code: 400,
            msg: "输入数据有误"
        }
    }
};

exports.update = function * () {

    //验证权限
    helper.auth(this);

    let body = this.request.body;

    if (body && body.preId && body.preId.match(/^[0-9a-fA-F]{24}$/)) {
        let resExist = yield BannerModel.find({"_id": body.preId});
        let prePosition = resExist[0].position;

        if(!prePosition) {
            this.body = {
                code: 400,
                msg: "数据不存在"
            }
            return ;
        }
        let data = {
            url: body.url,
            position: parseInt((body.position) || prePosition),
            preId: body.preId

        };

        let result = yield BannerModel.updateByUrl(data);

        if (result.nModified && result.nModified === 1) {
            this.body = {
                code: 200,
                msg: "更新成功"
            }
        } else if (result.ok && result.ok === 1) {
            this.body = {
                code: 302,
                msg: "数据未修改"
            }
        } else {
            this.body = {
                code: 500,
                msg: "服务器发生错误"
            }
        }
    } else {
        this.body = {
            code: 400,
            msg: "输入的数据有误"
        }
    }

};

exports.delete = function *() {
    let id = this.request.body.id;
    if(id.match(/^[0-9a-fA-F]{24}$/)) {
        let result = yield BannerModel.remove({"_id": id});

        if(result.ok === 1 && result.n !== 0) {
            this.body = {
                code: 200,
                msg: "数据删除成功"
            }
        } else {
            this.body = {
                code: 304,
                msg: "数据已经删除了"
            }
        }
         
    } else {
        this.body = {
            code: 400,
            msg: "输入的数据有误"
        }
    }
   
}