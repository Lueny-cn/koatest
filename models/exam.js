const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

//type:字段类型，包括String,Number,Date,Buffer,Boolean,Mixed,ObjectId,Array
//index:是否索引，注意唯一索引unique的写法
//default:默认值
const Exam = new Schema({
  
    "email": {
        type: String,
        index: true
    }, 
    "nickname": {
        type: String,
        index: true
    },
    "title": {
        type: String,
        index: true
    },
    "titleId": {
      type: String,
      index: true
    },
    "history": {
      type: String,
      default: " "
    },
    "score": {
        type: String,
        index: true,
        default: "未做过"
    },
    "finished": {
      type: Boolean,
      index: true,
      default: false
    },
    "read": {
      type: Boolean,
      index: true,
      default: false
    },
    "account": {
      type: Number,
      index: true,
      default: 0
    },
    "created": {
        type: Date,
        default: Date.now,
        index: true
    },
    "updated": {
        type: Date,
        default: Date.now,
        index: true
    }
});

//使用middleware，每次保存都记录一下最后更新时间
Exam.pre('save', function (next) {
    this.updated = Date.now();
    next();
});

Exam.statics.add = function (data) {
    return this.create(data);
};


//这里用的是find，返回同一类型数据集合
Exam.statics.findByTitleId  = function (id) {
    return this.find({"titleId": id})
        .exec();
};


//这里用的是find，返回同一类型数据集合
Exam.statics.findByEmail = function (email) {
    return this.find({"email":emailid})
        .exec();
};

Exam.statics.findIsExist  = function (email, titleId) {
    return this.find({"titleId": titleId, "email": email})
        .exec();
};

// 试题打开
Exam.statics.doRead = function (item) {
   return this.update({email: item.email, titleId: item.titleId}, {
       "account": item.account + 1
    }).exec();
};


// 试题提交登记
Exam.statics.doFinished = function (item) {
   return this.update({email: item.email, titleId: item.titleId}, {
        history: item.history,
        score: item.score,
        finished: item.finished
    }).exec();
};


Exam.statics.listRead = function (user) {
    return this.find({"email": user.email,"read": true}, {
        "history": 0,
        "score": 0 
    }).exec();
};

Exam.statics.listFinished= function (user) {
    return this.find({"email": user.email,"finished": true}).exec();
};

//创建模型
const model = mongoose.model('Exam', Exam);

module.exports = model;