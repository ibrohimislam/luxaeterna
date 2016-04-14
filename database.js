var connection = null;

var orm = require('orm');
var kota = require('./models/kota');
var pool = require('./models/pool');
var rute = require('./models/rute');
var pemesanan = require('./models/pemesanan');

function setup(db) {
  kota(db);
  pool(db);
  rute(db);
  pemesanan(db);
}

module.exports = function (cb) {
  if (connection) return connection;

  orm.connect("mysql://root@localhost/luxaeterna", function (err, db) {
    if (err) return cb(err);

    connections = db;
    setup(db);

    cb(null, db);
  });  
};
