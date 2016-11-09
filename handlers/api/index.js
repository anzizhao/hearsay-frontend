exports = module.exports = function (services) {
    return {
        entries: require('./get')(services.entries),
        entriesContent: require('./get')(services.entriesContent),
        images: require('./get')(services.images ),
        listItemImages: require('./get')(services.listItemImages ),
    };
};
