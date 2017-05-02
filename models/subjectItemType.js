const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

//type:字段类型，包括String,Number,Date,Buffer,Boolean,Mixed,ObjectId,Array
//index:是否索引，注意唯一索引unique的写法
//default:默认值
const SubjectItemType = new Schema({
    "subjectName": {
        type: String,
        index: {
            unique: true
        }
    },
    "parentType": {
        type: String,
        index: true
    },
    "parentId": {
        type: String,
        idnex:true
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
SubjectItemType.pre('save', function (next) {
    this.updated = Date.now();
    next();
});

SubjectItemType.statics.add = function (data) {
    return this.create(data);
};


//根据 _id 查找 数据
SubjectItemType.statics.findByTypeId = function (itemId) {
    return this.findOne({"_id": itemId})
        .exec();
};

//返回 类型ID
SubjectItemType.statics.findByTypeName = function (subjectName) {
    return this.findOne({"subjectName": subjectName},{"_id": 1})
        .exec();
};

//修改
SubjectItemType.statics.updateById = function (id, item) {
    return this.update({"_id": id}, {
        "subjectName": item.subjectName,
        "parentType":  item.parentType,
        "parentId":  item.parentId
    }).exec();
};

//创建模型
const model = mongoose.model('SubjectItemType', SubjectItemType);

module.exports = model;