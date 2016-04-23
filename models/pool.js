var model = function(db, cb) {
    var pool = db.define("pool", {
        nama : String,
        kota_id: String
    }, {
        methods: {},
        validations: {},
        cache : false
    });
    
    pool.hasOne("kota", db.models.kota, {autoFetch: true});

    return pool;
}


module.exports = model;