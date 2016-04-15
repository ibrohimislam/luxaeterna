var model = function(db, cb) {
    var pemesanan = db.define("pemesanan", {
        namalengkap : String,
        email: String,
        hp: String,
        rute_id: String,
        no_identitas: String
    }, {
        methods: {},
        validations: {}
    });

    return pemesanan;
}

module.exports = model;