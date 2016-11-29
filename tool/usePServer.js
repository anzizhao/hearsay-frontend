var debug = require('debug')('hearsay:usePServer');
var request = require('request');
var mongoose = require('mongoose');
var config = require('../config');
var setup = require('../setup');


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

var g_pServerUrl = "http://localhost:8111/api/v1/picture/fetch";

setTimeout(function(){
    var HearsayModel = models.hearsay.Entry;
    //HearsayModel.find( {"host": "blog.jobbole.com" } , function(err, items) {
        //console.log('after find')
        //if (err) {
            //console.log( 'err ')
            //console.dir( err );
            //return 
        //}
        //if (! items ) {
            //return  console.error('not found');
        //}
        //items.forEach( function(item){
            //console.log(item.host, item.image); 
        //})
    //})
    HearsayModel.find( {"host":{ "$in": hosts } } , function(err, items) {
        if (err) {
            console.dir( err );
            return 
        }
        if (! items ) {
            return  console.error('no item found');
        }
        items.forEach( function(item, index){
            if( ! item.image ) {
                return  
            }

            var requestData = {
                url: item.image,
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
                    item.image = body.data.url;
                    item.save();
                    return 
                }

                console.log( g_pServerUrl, error, response.statusCode);
            }); 

        })
    })

}, 1000)


