const SubjectTypeModel = require('../models/subjectType');

//列出所有数据
exports.list = function *(){
    // let page = this.query.page || 1;
    // let limit = 10;
    // let skip = (page-1)*limit;
    // this.body = yield UserModel.find().skip(skip).limit(limit);
    let result  = yield SubjectTypeModel.find({},{"_id": 1, "typename": 1});
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
};

//插入一条新数据，实际应用中应该读取客户端POST数据，本示例仅仅模拟
exports.insert = function *(){
    //下面都是随机造假数据

    let body = this.request.body;

    if(body) {
        let data = {
            "typename": body.typename
        };
        let result = yield new SubjectTypeModel(data).save();
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

exports.update  = function *() {
    let body = this.request.body,
        typename = body.subjectType,
        _id = body._id;

    let subjectType = {
        typename:typename,
        _id:_id
    };

    let result = yield SubjectTypeModel.updateSubjectType(subjectType);

    if(result.nModified  && result.nModified === 1) {
        this.body = {
            code: 200,
            msg: "更新成功"
        }
    } else if(result.ok && result.ok === 1 ){
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

};
