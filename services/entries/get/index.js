exports = module.exports = function (Entry, helpers) {
    return function (body, callback) {
        console.log(body);

        if (body.url) {
            Entry.findOne({ url: body.url }, null, {}, function (err, entry) {
                if (err) return callback(err);
                entry = entry || {};
                callback(err, entry);
            });
        } else {
            var perPage =  5;
            if( body.perPage ) {
                perPage = parseInt(body.perPage) 
            }

            var page = 0;
            if( body.page ) {
                page = parseInt(body.page );
            }

            if (page < 0) page = 0;

            var query = body.category ?
                {category: body.category} :
                {};

            var options = { sort: 'ranking', limit: perPage, skip: page * perPage };
            var fields = '-content.body';

            Entry.find(query, fields, options, function (err, entries) {
                if (err) return callback(err);
                entries = entries || [];
                callback(err, entries);
            });
        }
    };
};
