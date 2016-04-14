var model = function(db, cb) {
    var rute = db.define("rute", {
        keberangkatan : {type: 'date', time: true   },
        harga : Number
    }, {
        methods: {},
        validations: {}
    });
    
    rute.hasOne("asal", db.models.pool, {autoFetch: true});
    rute.hasOne("tujuan", db.models.pool, {autoFetch: true});

    return rute;
}


module.exports = model;