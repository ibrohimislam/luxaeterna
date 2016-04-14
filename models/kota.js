var model = function(db, cb) {
    var kota = db.define("kota", {
        nama : String
    }, {
        methods: {},
        validations: {}
    });

    return kota;
}

module.exports = model;