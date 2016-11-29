var debug = require('debug')('hearsay:usePServer');
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


setTimeout(function(){
    var HearsayModel = models.hearsay.Entry;
    HearsayModel.find( {"host":{ "$in": hosts } } , function(err, items) {
        if (err) {
            console.log( 'err ')
            console.dir( err );
            return 
        }
        if (! items ) {
            return  console.error('not found');
        }
        items.forEach( function(item){
            console.log(item.host, item.image); 
        })
    })

}, 1000)


