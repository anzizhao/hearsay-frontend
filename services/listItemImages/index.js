
exports = module.exports = function (Entry, helpers) {
    //define some function 



    return {
        get: require('./get')(Entry, helpers)
    };
};
