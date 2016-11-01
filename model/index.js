exports = module.exports = function( mongoose ) {
    return {
        leechImages: require('./leechImages').models(mongoose),
        hearsay: require('hearsay-common').models(mongoose),
    }
};
