
exports = module.exports = function (request, path) {
    return {
        get: require('../common/get')(request, path)
    };
};
