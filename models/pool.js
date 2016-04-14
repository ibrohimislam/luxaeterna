var model = function(db, cb) {
    var pool = db.define("pool", {
        nama : String
    }, {
        methods: {},
        validations: {}
    });
    
    pool.hasOne("kota", db.models.kota, {autoFetch: true});

    return pool;
}


module.exports = model;