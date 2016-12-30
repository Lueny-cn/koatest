const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

//type:字段类型，包括String,Number,Date,Buffer,Boolean,Mixed,ObjectId,Array
//index:是否索引，注意唯一索引unique的写法
//default:默认值
const Subject = new Schema({
    "question": {
        type: String,
        index: {
            unique: true
        }
    },
    "type": {
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
}
//静态方法，按用户名查找，因为Subjectname加了唯一索引，
//所以这里用的是findOne，只查询一条数据
Subject.statics.findBySubjectname = function (id) {
    return this.findOne({id: id})
        .exec();
};

//创建模型
const model = mongoose.model('Subject', Subject);

module.exports = model;