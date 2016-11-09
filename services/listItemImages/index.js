var async = require('async');
var debug = require('debug')("services:listItemImages");
var fs = require('fs');
var uuid = require('uuid');
var request = require('superagent');

var config = require('../../config');
var leechImageCfg = config.get('leechImage');
var urlDir = leechImageCfg.urlDir;

var util = require('../util');
var fetchImage = util.fetchImage;
var saveImageToDir = util.saveImageToDir;

function saveImage( body, Entry, id, res, callback) {
    async.parallel([
        saveImageToDir(id, res),
        function (callback)  {
            // 保存数据库 
            Entry.findOne({ url: body.id }, null, {}, function (err, entry) {
                if (err) return callback(err);

                var imageUrl = urlDir + id;
                entry.image = imageUrl;
                entry.save();
                callback(null);
            })
        }
    ], function(err){
        callback(err,  {
            origin: body.url, 
            url: urlDir +  id
        });
    });

}
function handleGet(Entry, helpers) {
    return function (body, callback) {
        // body={guid, url)   
        // 后台抓取 写入数据库  返回数据
        async.waterfall([
            fetchImage.bind(this, body.url ), 
            saveImage.bind(this, body, Entry),
        ], function(err, result){
            callback(null, result ); 
        })
    };

} 


exports = module.exports = function (Entry, helpers) {
    //define some function 
    return {
        get: handleGet(Entry, helpers),
    };
};
