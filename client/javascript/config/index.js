var apiUrl  
if( process.env.CLOUD || process.env.NOT_SHOW_PORT ) {
    apiUrl = '//' + process.env.CLIENT_DOMAIN + process.env.CLIENT_API_PATH ;
} else {
    apiUrl = '//' + process.env.CLIENT_DOMAIN + ':' + process.env.PORT + process.env.CLIENT_API_PATH;
}


exports = module.exports = {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    api: {
        url: apiUrl
    }
};
