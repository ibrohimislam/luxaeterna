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

module.exports = function (req, res, next) {
  if (connection == null) {
    orm.connect("mysql://root@localhost/luxaeterna?pool=true", function (err, db) {
      if (err) return res.status(500).send(err);

      connection = db;
      setup(connection);

      req.db = connection;
      req.models = connection.models;
      next();
    });
  }
  else {
    req.db = connection;
    req.models = connection.models;
    next();
  }
};
