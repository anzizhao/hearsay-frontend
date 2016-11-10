exports = module.exports = function (express, middleware, handlers, path) {
    var router = express();

    router.route(path)
        .all(middleware.isLoggedInAPI)
        .get(handlers.images.get)

    router.route(path + 'listItem')
        .all(middleware.isLoggedInAPI)
        .get(handlers.listItemImages.get )

    return router;
};
