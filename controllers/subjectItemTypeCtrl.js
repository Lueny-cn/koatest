const SubjectItemTypeModel = require('../models/subjectItemType');
const SubjectTypeModel = require('../models/subjectType');

//列出所有用户数据，支持分页
exports.list = function *(next){
    // let page = this.query.page || 1;
    // let limit = 10;
    // let skip = (page-1)*limit;
    // this.body = yield UserModel.find().skip(skip).limit(limit);
    let result = yield SubjectItemTypeModel.find();
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
    yield next;
};


exports.insert = function *(next) {
    let body = this.request.body,
        subjectName = body.subjectName,
        parentType = body.parentType;


    let parentId = yield SubjectTypeModel.findIdBySubjectType(parentType);

    if(parentId && parentId._id && subjectName && parentType) {

        let subjectExit = yield SubjectItemTypeModel.findByTypeName(subjectName);
        if(subjectExit) {
            this.body = {
                code: 400,
                msg: "已存在该课程"
            }
            return ;
        }
        let data = {
            subjectName,
            parentType,
            parentId: parentId._id
        };
        let result = yield  new SubjectItemTypeModel(data).save();
        if(result) {
            this.body = {
                code: 200,
                msg: "创建成功",
                item: data
            }
        }
    } else {
        this.body= {
            code: 500,
            msg: "数据有误"
        }
    }
    yield next;
};
exports.update = function *(next) {
    let body = this.request.body,
        _id = body._id,
        subjectName = body.subjectName,
        parentType = body.parentType;

    let parentId = yield SubjectTypeModel.findIdBySubjectType(parentType);
    if(parentId && parentId._id) {
        let item = {
            subjectName,
            parentType,
            parentId: parentId._id
        };
        let result = yield SubjectItemTypeModel.update(_id, item);

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
    }



    yield next;
}
