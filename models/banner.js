const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

//type:字段类型，包括String,Number,Date,Buffer,Boolean,Mixed,ObjectId,Array
//index:是否索引，注意唯一索引unique的写法
//default:默认值
const Banner = new Schema({
  
    "url": {
        type: String,
        index: {
            unique: true
        }
    }, 
    "position": {
        type: Number,
        index: true,
        default: 0
    },
    "user_email": {
        type: String,
        index: true,
        default: ""
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
Banner.pre('save', function (next) {
    this.updated = Date.now();
    next();
});

Banner.statics.add = function (data) {
    return this.create(data);
};

//这里用的是find，返回同一类型数据集合
Banner.statics.findByUrl  = function (url) {
    return this.find({"url": url})
        .exec();
};

Banner.statics.updateByUrl  = function (data) {
    return this.update({"url": data.url},{
        "position": data.position
    }).exec();
};

//创建模型
const model = mongoose.model('Banner', Banner);

module.exports = model;