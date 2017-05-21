const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

//type:字段类型，包括String,Number,Date,Buffer,Boolean,Mixed,ObjectId,Array
//index:是否索引，注意唯一索引unique的写法
//default:默认值
const Subject = new Schema({
    "question": {
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
    "choice": {
      type: Object,
    },
    "answer": {
      type: Object,
    },
    "score": {
        type: Number,
        index: true
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
Subject.pre('save', function (next) {
    this.updated = Date.now();
    next();
});

Subject.statics.add = function (data) {
    return this.create(data);
};

//这里用的是find，返回同一类型数据集合
Subject.statics.findByTitleId  = function (id) {
    return this.find({"titleId": id})
        .exec();
};

//这里用的是findOne，只查询一条数据
Subject.statics.findBySubjectId = function (id) {
    return this.findOne({"_id": id})
        .exec();
};



//创建模型
const model = mongoose.model('Subject', Subject);

module.exports = model;