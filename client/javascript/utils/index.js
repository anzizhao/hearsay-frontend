
function goTop(acceleration, time) {
    acceleration = acceleration || 0.1;
    time = time || 16;
    var x1 = 0;
    var y1 = 0;
    var x2 = 0;
    var y2 = 0;
    var x3 = 0;
    var y3 = 0;

    if (document.documentElement) {
            x1 = document.documentElement.scrollLeft || 0;
            y1 = document.documentElement.scrollTop || 0;
        }
    if (document.body) {
            x2 = document.body.scrollLeft || 0;
            y2 = document.body.scrollTop || 0;
        }
    var x3 = window.scrollX || 0;
    var y3 = window.scrollY || 0;
    // 滚动条到页面顶部的水平距离
    var x = Math.max(x1, Math.max(x2, x3));
    // 滚动条到页面顶部的垂直距离
    var y = Math.max(y1, Math.max(y2, y3));
    // 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
    var speed = 1 + acceleration;
    window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));
    // 如果距离不为零, 继续调用迭代本函数
    if (x > 0 || y > 0) {
        //var invokeFunction = "goTop(" + acceleration + ", " + time + ")";
        window.setTimeout(function(){
            goTop(acceleration, time) 
        }, time);
    }
}


function store (namespace, data) {
    if ( typeof data !== 'undefined' ) {
        return localStorage.setItem(namespace, JSON.stringify(data));
    }

    var store = localStorage.getItem(namespace);
    return (store && JSON.parse(store)) || null;
}

function storeSelect (data) {
    return store('storeSelect', data )
}

function storeHideImage (data) {
    return store('storeHideImage', data )
}


// 没有参数的 返回list
// id  返回某项的值 
// id value  设置某个项
function storeRead (id, value) {
    var storeKey = 'storeRead'
    var list = store( storeKey ) || {};
    
    if(typeof id === 'undefined' ) {
        return list  
    }
    if( typeof value  === 'undefined' ) {
        // get id item 
        return list[id] 
    } else {
        // set id item  
        list[id] = value
        return store( storeKey, list)
    }
}
function clearStoreRead (id, value) {
    var storeKey = 'storeRead'
    return store( storeKey, {})
}

function routeParams (){
    var params = [];
    var query = window.location.search.substr(1);
    query.split('&').forEach(function(item){
        var result = item.split('=');
        params.push( {
            key: result[0],
            value: result[1]
        })
    }) 
    return params;
}

module.exports = {
    store: store,
    storeSelect: storeSelect,
    goTop: goTop,
    storeRead: storeRead,
    clearStoreRead: clearStoreRead,
    storeHideImage: storeHideImage,
    routeParams: routeParams,
}
