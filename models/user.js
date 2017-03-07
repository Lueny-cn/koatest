const crypto = require('crypto');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

//type:字段类型，包括String,Number,Date,Buffer,Boolean,Mixed,ObjectId,Array
//index:是否索引，注意唯一索引unique的写法
//default:默认值
const User = new Schema({
    "username": {
        type: String,
        index: {
            unique: true,
            dropDups: true
        }
    },
    "password": {
        type: String,
        match: /\w+/,
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
    },
    "gender":{
        type: Number,
        default: 0
    },
    "tel":{
        type: Number,
        default:undefined
    }
});

//使用middleware，每次保存都记录一下最后更新时间
User.pre('save', function (next) {
    this.updated = Date.now();
    next();
});

User.statics.add = function (data) {
    return this.create(data);
}
//静态方法，按用户名查找，因为username加了唯一索引，
//所以这里用的是findOne，只查询一条数据
User.statics.findByUsername = function (username) {
    return this.findOne({username: username})
        .exec();
};

//创建模型
const model = mongoose.model('User', User);

module.exports = model;
