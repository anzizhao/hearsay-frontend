var debug = require('debug')('hearsay:usePServer');
var request = require('request');
var mongoose = require('mongoose');
var config = require('../config');
var setup = require('../setup');
var util = require('./util');


// database connection
setup.db(mongoose, config);


var models = require('../model')(mongoose);

var transformMap = [
    //{
        //host: "arstechnica.com",
        //category: "ArsTechnica",
    //},
    //{
        //host: "mashable.com",
        //category: "Mashable",
    //},
    {
        host: 'www.wired.com',
        category: "WiredScience",
    },
    //{
        //host: "blog.jobbole.com",
        //category: "bole",
    //},
    //{
        //host: "web.jobbole.com",
        //category: "bole",
    //}
];
//www.themuse.com
//www.inc.com
//www.sitepoint.com
var hosts = transformMap.map( function(item){
    return item.host;
}) 

var hostMapCategory = {}
transformMap.forEach(function(item){
    hostMapCategory[item.host] = item.category;
})

var g_pServerUrl;

if( process.env.NODE_DEV === 'development') {
    g_pServerUrl = "http://localhost:8111/api/v1/picture/fetch";
} else {
    g_pServerUrl = "https://image.anzizhao.com/api/v1/picture/fetch";
}



// 对pServer 返回404的项 重新请求 
setTimeout(function(){
    reFetch404Item();
    //usePServer();
}, 1000)


// 对pServer 返回404的项 重新请求 
function reFetch404Item () {
    var HearsayModel = models.hearsay.Entry;
    var gPicUrl =  "https://image.anzizhao.com/picture";
    var fields = '-content.body';
    var query =  {
        "host": { 
            "$in": hosts 
        }
    }
    HearsayModel.find( query, fields,  function(err, items) {
        if (err) {
            console.dir( err );
            return 
        }
        if ( !items.length ) {
            return  console.error('no item found');
        }
        items.forEach( function(item, index){
            //console.log('item: ', item.url, item.imageB )
            if( ! item.imageB ) {
                return 
            }
            request({
                url: 'https:' + item.imageB,
                method: "GET",
            }, function(error, response, body) {
                if ( error || response.statusCode !== 404) {
                    return 
                }
                console.log('404 item', item.imageB )
                // 返回404 项, 重现抓取
                makeFetchRequest(item);
            }); 

              //return console.log(item.host, item.image );

        })
        console.log('finish')
    })
}




// 将需要的网站的图片使用pServer
function usePServer ( ){
    var HearsayModel = models.hearsay.Entry;
    var fields = '-content.body';
    var query =  {
        "host": { 
            "$in": hosts 
        }
    }
    HearsayModel.find( query, fields,  function(err, items) {
        if (err) {
            console.dir( err );
            return 
        }
        if ( !items.length ) {
            return  console.error('no item found');
        }
        items.forEach( function(item, index){
            if( ! item.image 
                || item.imageB 
                ||( item.host.indexOf('jobbole.com') !== -1 && item.image.indexOf('/images') !== -1 ) 
              ) 
                    {
                        return  
                    }


                    makeFetchRequest(item);
        })
    })
}



function makeFetchRequest(item) {
    var url = util.fixRelativePath( item.image, item.source);
    var requestData = {
        url: url,
        category: hostMapCategory[item.host],
        options: {
            webp: true, 
        }
    };
    request({
        url: g_pServerUrl,
        method: "POST",
        json: true,
        body: requestData
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('result: ', body.data.url );
            item.imageB = body.data.url;
            item.save();
            return 
        }

        console.log( g_pServerUrl, error, response.statusCode);
    }); 
}
