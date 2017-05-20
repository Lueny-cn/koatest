const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

//type:字段类型，包括String,Number,Date,Buffer,Boolean,Mixed,ObjectId,Array
//index:是否索引，注意唯一索引unique的写法
//default:默认值


// 试题(比如 xxx面试题)
const SubjectTitle = new Schema({
   "title": {
       type: String,
       index: {
           queue: true
       }
   },
    "subjectItem": {
        type: String,
        index: true
    },
    "subjectItemId": {
        type: String,
        index: true
    },
    "subjectTime": {
        type: String,
        index: true
    },
    "examTime": {
        type: String,
        index: true,
        default: "30min"
    },
    "imgUrl": {
        type: String,
        index: true,
        default: ''
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
    "weight": {
        type: Number,
        default: 0
    }
});

//使用middleware，每次保存都记录一下最后更新时间
SubjectTitle.pre('save', function (next) {
    this.updated = Date.now();
    next();
});

SubjectTitle.statics.add = function (data) {
    return this.create(data);
};

//返回title Id
SubjectTitle.statics.findByTitle  = function (title) {
    return this.findOne({"title": title}, {"_Id": 1 })
        .exec();
};

//这里用的是findOne，只查询一条数据
SubjectTitle.statics.findById = function (id) {
    return this.findOne({"_id": id})
        .exec();
};

//试题时间
SubjectTitle.statics.findByTime = function (subjectTime) {
    return this.find({"subjectTime": subjectTime})
        .exec();
};

//试题类 (二级目录)
SubjectTitle.statics.findByItemId = function (subjectItemId) {
    return this.find({"subjectItemId": subjectItemId})
        .exec();
};

//修改
SubjectTitle.statics.updateById = function (id, item) {
    return this.update({"_id": id}, {
        "title": item.title,
        "subjectItem":  item.subjectItem,
        "subjectItemId":  item.subjectItemId,
        "subjectTime":  item.subjectTime,
        "examTime": item.examTime
    }).exec();
};

//修改
SubjectTitle.statics.updateUrlById = function (id, imgUrls) {
    return this.update({"_id": id}, {
        "imgUrl": imgUrl,
       
    }).exec();
};

//修改
SubjectTitle.statics.updateWeightById = function (id, weight, defaultWeight) {
    return this.update({"_id": id}, {
        "weight": +defaultWeight + weight
    }).exec();
};

//修改
SubjectTitle.statics.updateExmaTime= function (id, time) {
    return this.update({"_id": id}, {
        "examTime": time
    }).exec();
};

SubjectTitle.statics.doFinished = function(SubjectTitleId){
    return this.update({"_id": SubjectTitleId}, {
        "finished": true
    })
}

SubjectTitle.statics.doRead = function(SubjectTitleId){
    return this.update({"_id": SubjectTitleId}, {
        "read": true
    })
}

SubjectTitle.statics.addAcount = function(subjectItem){
    return this.update({"_id": subjectItem._id}, {
        "visited": subjectItem.visited + 1
    })
}
//创建模型
const model = mongoose.model('SubjectTitle', SubjectTitle);

module.exports = model;