var express = require('express');
var uuid = require('uuid');
var router = express.Router();

/* GET pool list */
router.get('/', function(req, res, next) {
  req.models.pemesanan.all({}, function(err, result) {
    if (err) res.status(500).jsonp({status: 'err', err: err});
    res.status(200).jsonp({status: 'ok', result: result});
  });
});

router.post('/', function(req, res, next) {
  req.body.id = uuid.v4().replace(new RegExp('-', 'g'), '');
  req.models.pemesanan.create(req.body, function(err, result){

  	if (err) res.status(500).jsonp({status: 'err', err: err});
  	res.status(200).jsonp({status: 'ok', result: result});

  });
});

module.exports = router;
