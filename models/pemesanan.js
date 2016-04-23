var model = function(db, cb) {
    var pemesanan = db.define("pemesanan", {
        namalengkap : String,
        email: String,
        hp: String,
        rute_id: String,
        no_identitas: String,
        tanggal: { type: "date", time: false },
        status: Number
    }, {
        methods: {},
        validations: {},
        cache : false
    });

    pemesanan.hasOne("rute", db.models.rute, {autoFetch: true});

    return pemesanan;
}

module.exports = model;