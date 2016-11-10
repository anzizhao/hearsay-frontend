
var fs = require('fs');
var config = require('../config');
var leechImageCfg = config.get('leechImage');

var saveDir = leechImageCfg.saveDir;
var urlDir = leechImageCfg.urlDir;

function saveImageToDir(uuid, res) {
    return function(callback) {
        // 保存图片  返回新的图片地址 
        var savePath = saveDir +  uuid;
        var w = fs.createWriteStream(savePath)
        res.pipe(w)
        w.on('finish', function(){
            callback(null, urlDir + uuid );
        });
    }
}

function fetchImage (image, callback) {
    request
    .get(image)
    .end(function (error, res) {
        if (error|| res.status !== 200 ){
            debug('fetch fail: ' + image ) 
            callback(null)
        } 
        var id = uuid.v1();
        callback(null, id, res.res );
    });
}

exports = module.exports = {
    fetchImage:fetchImage,
}
