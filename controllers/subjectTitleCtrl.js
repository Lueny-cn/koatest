const SubjectTitleModel = require('../models/subjectTitle');
const SubjectItemModel = require('../models/subjectItemType');
const helper = require("../helper/helper");
const ExamModel = require("../models/exam")
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

    //验证权限
    helper.auth(this);


    let body = this.request.body;
    let data ={};


    if(body) {

       let subjectItem = yield SubjectItemModel.findByTypeName(body.subjectItem);
       if(subjectItem) {
           data.title = body.title;
           data.subjectItem = body.subjectItem;
           data.subjectItemId = subjectItem._id;
           data.subjectTime = body.subjectTime;
           data.examTime = body.examTime

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


     //验证权限
    helper.auth(this);

    let body = this.request.body;
    let data ={};
    if(body &&  (body.preTitleId.match(/^[0-9a-fA-F]{24}$/))) {
       let subjectItem = yield SubjectItemModel.find({"_id": body.subjectItemId});
       let subjectTitle = yield SubjectTitleModel.find({"_id":body.preTitleId});

console.log("subjectItem", subjectItem)
console.log("subjectTitle", subjectTitle)
console.log("preTitleId", body.preTitleId)
       if(subjectItem && subjectTitle) {
           data = {
                title: body.title,
                _id: body.preTitleId,
                subjectItem: subjectItem[0].subjectName,
                subjectItemId: body.subjectItemId,
                subjectTime: body.subjectTime ||subjectTitle[0].subjectTime,
                examTime: body.examTime || subjectTitle[0].examTime
           }
       }
console.log("subjectTitle data", data)
        let result = yield SubjectTitleModel.updateById(data._id, data);
        console.log("subjectTitle result", result)
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
            let item = {
                _id: result._id,
                visited: result.visited
            };
            yield SubjectTitleModel.addAcount(item); 
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

exports.doFinshed = function *(){

    let body = this.request.body,
        subjectTitleId = body.subjectTitleId;

     if(subjectTitleId.match(/^[0-9a-fA-F]{24}$/)) {
       let result = yield SubjectTitleModel.findById(subjectTitleId);
        if(result) {
           let updateRes = yield  SubjectTitleModel.doFinshed(subjectTitleId);
           if(updateRes) {
               this.body = {
                   code: 200,
                   data: updateRes,
                   msg: "已经完成"
               }
           } else {
               this.body = {
                   code: 500,
                   msg: "服务器错误"
               }
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
            msg: "数据有误"
        }
    }
};

exports.doRead = function *(){

    let body = this.request.body,
        subjectTitleId = body.subjectTitleId;

     if(subjectTitleId.match(/^[0-9a-fA-F]{24}$/)) {
       let result = yield SubjectTitleModel.findById(subjectTitleId);
        if(result) {
           let updateRes = yield  SubjectTitleModel.doRead(subjectTitleId);
           if(updateRes) {
               this.body = {
                   code: 200,
                   data: updateRes,
                   msg: "已阅读"
               }
           } else {
               this.body = {
                   code: 500,
                   msg: "服务器错误"
               }
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
            msg: "数据有误"
        }
    }
};

exports.listFinished = function *() {
    this.body = yield SubjectTitleModel.find({"finished": true});
}

exports.listRead = function *() {
    this.body = yield SubjectTitleModel.find({"read": true});
}


//post 
exports.updateWeight= function *() {
    let titleId = this.request.body.titleId;

    if(titleId !== undefined && titleId.match(/^[0-9a-fA-F]{24}$/)) {
        let weight = 5;  //系统推荐
        let resExam = yield ExamModel.find().
                        sort({"account": 1}).limit(16);

        //做题多的 +3
        resExam.map( (item) => {
            if(titleId == item._id) {
                weight += 3;
            }
        });                 
        let resTime = yield SubjectTitleModel.find().
                        sort({"created": -1}).limit(10);
        //新题 +2
        resTime.map( (item) => {
            if(titleId == item._id) {
                weight += 2;
            }
        });    

        let resWeight = yield SubjectTitleModel.find({"_id": titleId}, {"weight": 1});
        let result = yield SubjectTitleModel.updateWeightById(titleId, weight, resWeight[0].weight);


        if(result.nModified  && result.nModified === 1) {
            this.body = {
                code: 200,
                msg: "权值更新成功"
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
}

exports.listWeight= function *(limit) {
    if( typeof(limit) !== "number") {
        limit = 50;
    }
    this.body = yield SubjectTitleModel.find().sort({"weight": -1}).limit(limit);
}

//post 
exports.updateExamTime= function *() {
    let titleId = this.request.body.titleId;

    if(titleId !== undefined && titleId.match(/^[0-9a-fA-F]{24}$/)) {
        let examTime = this.request.body.examTime;

        let result = yield SubjectTitleModel.updateExamTime(titleId, examTime);


        if(result.nModified  && result.nModified === 1) {
            this.body = {
                code: 200,
                msg: "考试时间更新成功"
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
}