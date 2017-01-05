const SubjectTitleModel = require('../models/subjectTitle');
const SubjectItemModel = require('../models/subjectItemType');

//列出所有用户数据，支持分页
exports.list = function *(){
    // let page = this.query.page || 1;
    // let limit = 10;
    // let skip = (page-1)*limit;
    // this.body = yield UserModel.find().skip(skip).limit(limit);
    this.body = yield SubjectTitleModel.find();
};

//插入一条新数据，实际应用中应该读取客户端POST数据，本示例仅仅模拟
exports.insert = function *(){

    var body = this.request.body;
    var data ={};


    if(body) {

       var subjectItem = yield SubjectItemModel.findByTypeName(body.subjectItem);
       if(subjectItem) {
           data.title = body.title;
           data.subjectItem = body.subjectItem;
           data.subjectItemId = subjectItem._id;
           data.subjectTime = body.subjectTime;

           let result = yield new SubjectTitleModel(data).save();
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
    } else {
        this.body = {
            code: 400,
            msg: "输入数据有误"
        }
    }
};

//更新
exports.update = function *(){
    //下面都是假数据
    var body = this.request.body;
    var data ={};
    if(body) {

        subject.choice instanceof Array ?
            subject.choice.forEach( (item, index) => {
                choiceObj[fromCodePoint(65+index)] = item; //"A", "B", "C", ......
            }) : "";

        data.subjectItem = subject.subjectItem;
        data.subjectItemId = subject.subjectItemId;
        data.question = subject.question;
        data.choice =  choiceObj;
        data.answer = {
            select: subject.select,
            detail: subject.detail
        };
        data.score = parseInt(subject.score);

        let result = yield new SubjectTitleModel(data).save();
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
    } else {
        this.body = {
            code: 400,
            msg: "输入数据有误"
        }
    }
};



exports.oneByTitleId = function *(titleId){

    if(titleId.match(/^[0-9a-fA-F]{24}$/)) {
        let result = yield SubjectTitleModel.findById(titleId);
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
            msg: "输入数据有误"
        }
    }
};

exports.listBySbId = function *(subjectId){

    if(subjectId.match(/^[0-9a-fA-F]{24}$/)) {
        let result = yield SubjectTitleModel.findByItemId(subjectId);
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
            msg: "输入数据有误"
        }
    }
};

exports.listByTime = function *(time){

    if(time) {
        let result = yield SubjectTitleModel.findByTime(time);
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
            msg: "输入数据有误"
        }
    }
};

