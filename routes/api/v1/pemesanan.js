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

router.get('/waiting', function(req, res, next) {
  req.models.pemesanan.all({status: 1}, function(err, result) {
    if (err) res.status(500).jsonp({status: 'err', err: err});
    res.status(200).jsonp({status: 'ok', result: result});
  });
});


router.get('/:id', function(req, res, next) {
  req.models.pemesanan.all({id: req.params.id}, function(err, result) {
    if (err) res.status(500).jsonp({status: 'err', err: err});
    res.status(200).jsonp({status: 'ok', result: result[0]});
  });
});

router.post('/', function(req, res, next) {
  req.body.id = uuid.v4().replace(new RegExp('-', 'g'), '').substr(-10);
  req.models.pemesanan.create(req.body, function(err, result){
  	
  	if (err) res.status(500).jsonp({status: 'err', err: err});
  	res.status(200).jsonp({status: 'ok', result: result});
  	
  });
});

router.post('/konfirmasi/:id', function(req, res, next) {
  req.models.pemesanan.find({id: req.params.id},function(err, result){
    
    if (err) return res.status(500).jsonp({status: 'err', err: err});

    result[0].status = 1;

    result[0].save(function (err) {
      if (err) res.status(500).jsonp({status: 'err'});
      res.status(200).jsonp({status: 'ok'});
    });
    
  });
});

router.post('/payment_confirmation/:id', function(req, res, next) {
  req.models.pemesanan.find({id: req.params.id},function(err, result){
    
    if (err) return res.status(500).jsonp({status: 'err', err: err});

    result[0].status = 2;

    result[0].save(function (err) {
      if (err) res.status(500).jsonp({status: 'err'});
      res.status(200).jsonp({status: 'ok'});
    });
    
  });
});
module.exports = router;
