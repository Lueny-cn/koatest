const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

//type:字段类型，包括String,Number,Date,Buffer,Boolean,Mixed,ObjectId,Array
//index:是否索引，注意唯一索引unique的写法
//default:默认值
const SubjectType = new Schema({
    "typename": {
        type: String,
        index: {
            unique: true
        }
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
SubjectType.pre('save', function (next) {
    this.updated = Date.now();
    next();
});

SubjectType.statics.add = function (data) {
    return this.create(data);
};

//根据题型查询题型的id
SubjectType.statics.findIdBySubjectType = function (typename) {
    return this.findOne({typename: typename},{"_id": 1})
        .exec();
};

//修改
SubjectType.statics.updateSubjectType = function (item) {
    return this.update({_id: item._id},{
        $set: {typename: item.typename}
    }).exec();
};

//创建模型
const model = mongoose.model('SubjectType', SubjectType);

module.exports = model;