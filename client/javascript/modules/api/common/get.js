exports = module.exports = function (request, path) {
    var _request = function(query, callback, cache, key){
        request
        .get(path)
        .query(query)
        .end(function (error, res) {
            if (error) return callback(error);
            if (res.status != 200) return callback('unexpected response code: ' + res.status);
            if (!res.body) return callback('no body');
            if( cache ) {
                cache[key] = {
                    d: res.body, 
                    t: Date.now(), 
                } 
            }
            callback(null, res.body);
        });
    } 
    // 参考underscore的memoize  增加缓存
    // TODO 做成公共的库
    var memoizeRequest = function( query, callback, opt ){
        var _opt = opt || {}
        var option = {
            expired: _opt.expired || 5*60*1000   // 默认5分钟到期
        } 

        var cache = memoizeRequest.cache;
        if( typeof query.page === 'undefined' ) {
            return _request( query, callback )
        }
        var key = String(query.page)  + query.category  +String(query.perPage) ;
        if( typeof cache[key] !== 'undefined' && (Date.now() - cache[key].t) < option.expired ) {
            callback(null, cache[key].d ) 
        } else {
            _request( query, callback, cache, key) 
        }

    }
    memoizeRequest.cache = {}

    return function (query, callback) {
        // 调用
        memoizeRequest.apply(this, arguments)
    };
};
