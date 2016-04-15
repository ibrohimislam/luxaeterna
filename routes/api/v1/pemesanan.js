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
  console.log(req.body.namalengkap);
  console.log(req.body.email);
  console.log(req.body.hp);
  req.models.pemesanan.create({
  	id: uuid.v4().replace(new RegExp('-', 'g'), ''),
    namalengkap: request.body.namalengkap,
    email: request.body.email,
    hp: request.body.hp,
  	rute_id: request.body.rute_id,
  }, function(err, result){
  	console.log(err);
  	console.log(result);
  });
});

module.exports = router;
