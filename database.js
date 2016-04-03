var connection = null;

var orm = require('orm');
var users = require('./models/users');

function setup(db) {
  users(db);
}

module.exports = function (cb) {
  if (connection) return connection;

  orm.connect("mysql://root:24m281y24@localhost/luxaeterna", function (err, db) {
    if (err) return cb(err);

    connections = db;
    setup(db);

    cb(null, db);
  });  
};
