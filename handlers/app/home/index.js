var nodejsx = require('node-jsx').install();
var App = require('../../../client/javascript/app');
var categories = require('../../../helpers/categories/tree');

exports = module.exports = function (services, helpers) {
    return function (req, res, next) {
        var context = {
            title: 'an news',
            description: 'the news that anzi concern about',
            startTime: new Date(),
            categories: categories,
            //supportWebp: false,
        };

        helpers.react.renderMarkupToString({
            component: App,
            clientScripts: ['/javascript/app.js'],
            context: context,
            staticPage: false,
            callback: function (err, markup) {
                if (err) return next(err);
                res.send(markup);
            }
        });
    };
};
