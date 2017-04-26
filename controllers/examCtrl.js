const ExamModel = require('../models/exam');
const SubjectTitleModel = require("../models/subjectTitle");

//列出所有用户数据，支持分页
exports.list = function *(){
    // let page = this.query.page || 1;
    // let limit = 10;
    // let skip = (page-1)*limit;
    // this.body = yield UserModel.find().skip(skip).limit(limit);
    this.body = yield ExamModel.find();
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

exports.doRead = function *(){
    
    let exam = this.request.body;
    let data ={}, nickname, email,
        subjectTitleId = exam.titleId;
    
    if(subjectTitleId.match(/^[0-9a-fA-F]{24}$/)) {
        let isExitTitle = yield SubjectTitleModel.findById(subjectTitleId);
        if(!isExitTitle.title) {
            this.body = {
                code: 400,
                msg: "试题不存在, 请输入正确的试题名或id"
            }
            return ;
        }
    } else {
        this.body = {
            code: 400,
            msg: "试题不存在, 请输入正确的试题名或id"
        }
        return ;
    }

    if(exam) {
        if(this.session && this.session.user) {
            nickname = this.session.user.nickname;
            email = this.session.user.email
        } else {
            // this.body= {
            //     code: 400,
            //     msg: "用户登录"
            // }
            nickname = "游客";
            email = "test@test.com"
        }
        data = {
            nickname: nickname,
            email: email,
            title: exam.title,
            titleId: exam.titleId,
            read: true,
            account: 1
        }
        let isExist = yield ExamModel.findIsExist(data.email,data.titleId);

        if(isExist.email) {
            data.account = isExist.account;
            let result = yield ExamModel.doRead(data);
            if(result) {
                this.body = {
                    code: 200,
                    data: result,
                    msg: "试题打开过,但未提交做题情况"
                };
            } else {
                this.body = {
                    code: 500,
                    msg: "服务器错误"
                }
            }

        } else {
            let result = yield new ExamModel(data).save();
            if(result) {
                this.body = {
                    code: 200,
                    data: result,
                    msg: "试题打开过,但未提交做题情况"
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

// 提交答题情况 @interface
/**
 * method: post
 * data: {
 *  titleId: 试题名id[string]
 *  title: 试题名[string]
 *  history: 答题记录[试题序列对应的用户答案的键值对 对象]
    score: 分数[string]
 * }
 */

exports.doFinished = function *(){
    var exam = this.request.body;
    var data ={},nickname,email,
    subjectTitleId = exam.titleId;


    if(subjectTitleId.match(/^[0-9a-fA-F]{24}$/)) {
        let isExitTitle = yield SubjectTitleModel.findById(subjectTitleId);
        console.log(1231323132)
        if(!isExitTitle.title) {
            this.body = {
                code: 400,
                msg: "试题不存在, 请输入正确的试题名或id"
            }
            return ;
        }
    } else {
        this.body = {
            code: 400,
            msg: "试题不存在, 请输入正确的试题名或id"
        }
        return ;
    }


    if(exam) {

      if(this.session && this.session.user) {
            nickname = this.session.user.nickname;
            email = this.session.user.email
        } else {
            // this.body= {
            //     code: 400,
            //     msg: "用户登录"
            // }
            nickname = "游客";
            email = "test@test.com"
        }
        data = {
            nickname: nickname,
            email: email,
            title: exam.title,
            titleId: exam.titleId,
            read: true,
            finished: true,
            history: exam.history,
            score: exam.score
        }
        let result = yield ExamModel.doFinished(data);

        if(result.nModified  && result.nModified === 1) {
            this.body = {
                code: 200,
                msg: "答题情况提交成功"
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




exports.listRead = function *(){
  if(this.session && this.session.user) {
      let user = this.session.user;
      let list = yield ExamModel.listRead(user);
      if(list) {
          this.body = {
              code: 200,
              data: list
          }
      } else {
          this.body = {
              code: 400,
              msg: "请求错误.."
          }
      }
  } else{
      this.body = {
          code: 400,
          msg: "用户未登录"
      }
  }
};


exports.listFinished = function *(){
  if(this.session && this.session.user) {
      let user = this.session.user;
      let list = yield ExamModel.listFinished(user);
      if(list) {
          this.body = {
              code: 200,
              data: list
          }
      } else {
          this.body = {
              code: 400,
              msg: "请求错误.."
          }
      }
  } else{
      this.body = {
          code: 400,
          msg: "用户未登录"
      }
  }
};
