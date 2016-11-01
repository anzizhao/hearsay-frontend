var request = require('superagent');

exports = module.exports = function (config) {
    return {
        entries: require('./entries')(request, config.api.url + '/entries'),
        images: require('./images')(request, config.api.url + '/images'),
    };
};
