const SubjectModel = require('../models/subject');
const SubjectTitleModel = require('../models/subjectTitle')
const helper = require("../helper/helper");

//列出所有用户数据，支持分页
exports.list = function *(){
    // let page = this.query.page || 1;
    // let limit = 10;
    // let skip = (page-1)*limit;
    // this.body = yield UserModel.find().skip(skip).limit(limit);
    this.body = yield SubjectModel.find();
};

//插入一条新数据，实际应用中应该读取客户端POST数据，本示例仅仅模拟
exports.insert = function *(){
 
    
    //验证权限
    helper.auth(this);
    
    var subject = this.request.body;
    var choiceObj = {},
        data ={},
        fromCodePoint = String.fromCodePoint;
    if(subject) {

        let titleId = yield SubjectTitleModel.findByTitle(subject.title);
        
        if(!titleId) {
            this.body = {
                code: 400,
                msg: "课程不存在"
            }
            return ;
        }
        let resExit = yield SubjectModel.find({"question": subject.question});
        if(resExit.length !==0) {
           if( resExit[0].titleId == subject.titleId) {
               this.body = {
                   code: 304,
                   msg: "题目已经存在当前试题中"
               }
               return ;
           }
        }

        subject.choice instanceof Array ?
            subject.choice.forEach( (item, index) => {
                choiceObj[fromCodePoint(65+index)] = item;
            }) : "";

        data.title = subject.title;
        data.titleId = titleId._id;
        data.question = subject.question;
        data.choice =  choiceObj;
        data.answer = {
            select: subject.select,
            detail: subject.detail
        };
        data.score = parseInt(subject.score);

        let result = yield new SubjectModel(data).save();
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

//更新
exports.update = function *(){
    
    //验证权限
    helper.auth(this);

    var subject = this.request.body;
    var choiceObj = {},
        data ={},
        fromCodePoint = String.fromCodePoint;
    if(subject) {

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

        let result = yield new SubjectModel(data).save();
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




exports.listByType = function *(titleId){
    var itemExist;

    if(titleId.match(/^[0-9a-fA-F]{24}$/)) {
        itemExist = yield SubjectTitleModel.findById(titleId);
    } else  {
        itemExist = false;
    }
    if(itemExist) {
        let result = yield SubjectModel.findByTitleId(titleId);
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
        let result = yield SubjectModel.findBySubjectId(subjectId);
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
