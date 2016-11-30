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
    {
        host: "arstechnica.com",
        category: "ArsTechnica",
    },
    {
        host: "mashable.com",
        category: "Mashable",
    },
    {
        host: "www.wired.com",
        category: "Wired.com",
    },
    {
        host: "blog.jobbole.com",
        category: "bole",
    },
    {
        host: "web.jobbole.com",
        category: "bole",
    }
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

setTimeout(function(){
    var HearsayModel = models.hearsay.Entry;
    HearsayModel.find( {"host":{ "$in": hosts } } , function(err, items) {
        if (err) {
            console.dir( err );
            return 
        }
        if ( !items.length ) {
            return  console.error('no item found');
        }
        items.forEach( function(item, index){
            if( ! item.image ) {
                return  
            }
            console.log( item.image);
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
                //body: JSON.stringify(requestData)
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

        })
    })
}, 2000)


