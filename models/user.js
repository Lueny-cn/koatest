const crypto = require('crypto');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

//type:字段类型，包括String,Number,Date,Buffer,Boolean,Mixed,ObjectId,Array
//index:是否索引，注意唯一索引unique的写法
//default:默认值
const User = new Schema({
    "email": {
        type: String,
        index: {
            unique: true,
            dropDups: true
        }
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    "password": {
        type: String,
        match: /\w+/,
        index: true
    },
    "nikename": {
        type: String,
        default: "",
        index: true
    },
    "gender": {
        type: Number,
        default: 0
    },
    "tel": {
        type: Number,
        default: 0
    },
    "birthday": {
        type: Date,
        default: Date.now(),
        index: true
    },
    "school": {
        type: String,
        default: "",
        index: true
    },
    "education": {
        type: String,
        default: "",
        index: true
    },
    "created": {
        type: Date,
        default: Date.now
    },
    "updated": {
        type: Date,
        default: Date.now
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
//静态方法，按 邮箱 查找，因为 email 加了唯一索引，
//所以这里用的是findOne，只查询一条数据
User.statics.findByEmail = function (email) {
    return this.findOne({email: email})
        .exec();
};

User.statics.updateByEmail = function (email, user) {
    return this.update({email: email}, {
        nikename: user.nikename,
        gender: user.gender,
        tel: user.tel,
        birthday: user.birthday,
        school: user.school,
        education: user.education
    }).exec();
};

//创建模型
const model = mongoose.model('User', User);

module.exports = model;
