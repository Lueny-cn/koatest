const SubjectModel = require('../models/subject');

//列出所有用户数据，支持分页
exports.list = function *(){
    // let page = this.query.page || 1;
    // let limit = 10;
    // let skip = (page-1)*limit;
    // this.body = yield UserModel.find().skip(skip).limit(limit);
    this.body = yield SubjectModel.find();
};

//插入一条新数据，实际应用中应该读取客户端POST数据，本示例仅仅模拟
exports.insert = function *(){
    //下面都是随机造假数据

    let data = {
        "type": "math",
        "question": "有写着数字的2、5、8的卡片各十张，现在从中任意抽出7张，这7张卡片的和可能等于",
        "choice": {
            "A": 21,
            "B": 25,
            "C": 29,
            "D": 58
        },
        "answer": {
            "select": "C",
            "detail": "无"
        },
        "score": 4
    };

    let result = yield new SubjectModel(data).save();
    this.body = result;
};
