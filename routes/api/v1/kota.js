var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  req.models.kota.all({}, function(err, result) {
    if (err) res.status(500).jsonp({status: 'err', err: err});
    res.status(200).jsonp({status: 'ok', result: result});
  });
});

module.exports = router;