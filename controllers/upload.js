const formParse = require('co-busboy')
const fs = require('fs');
const path = require('path');
const subjectTitleModel = require('../models/subjectTitle');

module.exports = {
    upload: function *(titleid) {
        //解析为generator对象
        var parts = formParse(this.request)
        var part;
        console.log(this.request)
         console.log(this.parts)
        //此数组用于存储图片的url
        var fileNames = []
        while (part = yield parts) {
            //此时part为返回的流对象
            var filename = part.filename
            fileNames.push(filename)
            var homeDir = path.resolve(__dirname, '..')
            var newpath = homeDir + '/public/images/' + filename;
            //生成存储路径，要注意这里的newpath必须是绝对路径，否则Stream报错
            var stream = fs.createWriteStream(newpath);
            //写入文件流
            part.pipe(stream);
        }
        if (fileNames.length > 0) {
            console.log('fileNames', fileNames)
            var imgUrls = [];
            for (var item of fileNames) {
                imgUrls.push("http://localhost:3000/images/" + item)
            }
            let result = yield subjectTitleModel.updateUrlById(titleid, imgUrls[0])
            this.body = {
                code: 0,
                message: '上传成功',
                result: {
                    urls: imgUrls,
                    result: result
                }
            }
        }
    }
}