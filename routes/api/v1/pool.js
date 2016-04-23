var express = require('express');
var uuid = require('uuid');
var router = express.Router();

/* GET pool list */
router.get('/', function(req, res, next) {
  req.models.pool.all({}, function(err, result) {
    if (err) res.status(500).jsonp({status: 'err', err: err});
    res.status(200).jsonp({status: 'ok', result: result});
  });
});

router.get('/:id', function(req, res, next) {
  req.models.pool.get(req.params.id, function(err, result) {
    if (err) res.status(500).jsonp({status: 'err', err: err});
    res.status(200).jsonp({status: 'ok', result: result});
  });
});

router.post('/', function(req, res, next) {
  console.log(req.body);

  req.body.id = uuid.v4().replace(new RegExp('-', 'g'), '');
  req.models.pool.create(req.body, function(err, result){
  	
  	if (err) res.status(500).jsonp({status: 'err', err: err});
  	res.status(200).jsonp({status: 'ok', result: result});
  	
  });
});

router.delete('/:id', function(req, res, next) {
  console.log(req.body);

  req.body.id = uuid.v4().replace(new RegExp('-', 'g'), '');
  req.models.pool.find({id: req.params.id}).remove(function(err){
  	
  	if (err) res.status(500).jsonp({status: 'err'});
  	res.status(200).jsonp({status: 'ok'});
  	
  });
});

router.put('/:id', function(req, res, next) {
  req.models.pool.find({id: req.params.id},function(err, result){
  	
  	if (err) return res.status(500).jsonp({status: 'err', err: err});

  	result[0].nama = req.body.nama;
    
    delete result[0].kota;
    result[0].kota_id = req.body.kota_id;

  	result[0].save(function (err) {
	  	if (err) res.status(500).jsonp({status: 'err'});
	  	res.status(200).jsonp({status: 'ok'});
    });
  	
  });
});

module.exports = router;
