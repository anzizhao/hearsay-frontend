function store (namespace, data) {
    if (data) {
        return localStorage.setItem(namespace, JSON.stringify(data));
    }

    var store = localStorage.getItem(namespace);
    return (store && JSON.parse(store)) || null;
}

function storeSelect (data) {
    return store('storeSelect', data )
}

module.exports = {
    store: store,
    storeSelect: storeSelect,
}
