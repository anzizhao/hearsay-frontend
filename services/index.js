// 处理数据库


exports = module.exports = function (models, helpers) {
    return {
        entries: require('./entries')(models.hearsay.Entry, helpers),
        entriesContent: require('./entries-content')(models.hearsay.Entry, helpers),
        listItemImages: require('./listItemImages')(models.hearsay.Entry, helpers),
        images: require('./images')(models.leechImages, helpers),

    };
};
