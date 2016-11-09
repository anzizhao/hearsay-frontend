//Entry 为leechImages表的项
var request = require('superagent');
var async = require('async');
var config = require('../../../config');
var uuid = require('uuid');
var debug = require('debug')("services:images:get");
var util = require('../../util');
var fs = require('fs');

var fetchImage = util.fetchImage;
var saveImageToDir = util.saveImageToDir;

//var Entry;
var leechImageCfg = config.get('leechImage');
var saveDir = leechImageCfg.saveDir;
var urlDir = leechImageCfg.urlDir;


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
function saveImage(image, Entry, id, res, callback) {
    async.parallel([
        function (callback)  {
            // 保存数据库 
            //添加新的一条记录
            var entry = {
                origin: image, 
                url: id 
            };
            var newItem = new Entry( entry );       
            newItem.save(function (err) {
                var error = err ? 'error saving article: ' + err : null;
                callback(error);
            });
        },
        saveImageToDir(id, res),
        //function (callback) {
            //var savePath = saveDir +  id;
            //var w = fs.createWriteStream(savePath)
            //res.pipe(w)
            //w.on('finish', function(){
                //callback(null);
            //});
        //}
    ], function(err){
        callback(err,  {
            origin: image, 
            url: urlDir +  id
        });
    })

}

function getImage (Entry, image, callback) {
    //if( !_Entry ) {
        //callback(new Error('Entry is undefined'))
    //}
    // 判断是否有结果
    Entry.findOne({ origin: image }, null, {}, function (err, entry) {
        if (err) {
            return callback(err);
        }
        if ( entry ) {
            return callback(null, {
                origin: entry.origin, 
                url: urlDir + entry.url,
            });
        }
        //不存在
        async.waterfall([
            fetchImage.bind(this, image), 
            saveImage.bind(this, image, Entry),
        ], function(err, result){
            callback(null, result ); 
        })
    });
}

exports = module.exports = function (_Entry, helpers) {
    return function (body, callback) {
        async.concat(body.imgs.split(','), getImage.bind(this, _Entry), function(err, results ){
            callback(err, results);
        })
    };
};
