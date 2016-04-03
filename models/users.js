module.exports = function(db, cb) {
	return db.define("users", {
        username : String,
    }, {
        methods: {},
        validations: {}
    });
}