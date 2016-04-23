var express = require('express');
var uuid = require('uuid');

var router = express.Router();

/* GET rute list */
router.get('/', function(req, res, next) {
  req.models.rute.all({}, function(err, result) {
    if (err) res.status(500).jsonp({status: 'err', err: err});
    res.status(200).jsonp({status: 'ok', result: result});
  });
});

router.get('/:id', function(req, res, next) {
  req.models.rute.get(req.params.id, function(err, result) {
    if (err) res.status(500).jsonp({status: 'err', err: err});
    res.status(200).jsonp({status: 'ok', result: result});
  });
});

router.post('/', function(req, res, next) {
  console.log(req.body);

  req.body.id = uuid.v4().replace(new RegExp('-', 'g'), '');
  req.models.rute.create(req.body, function(err, result){
    
    if (err) res.status(500).jsonp({status: 'err', err: err});
    res.status(200).jsonp({status: 'ok', result: result});
    
  });
});


router.delete('/:id', function(req, res, next) {
  console.log(req.body);

  req.body.id = uuid.v4().replace(new RegExp('-', 'g'), '');
  req.models.rute.find({id: req.params.id}).remove(function(err){
    
    if (err) res.status(500).jsonp({status: 'err'});
    res.status(200).jsonp({status: 'ok'});
    
  });
});

router.put('/:id', function(req, res, next) {
  req.models.rute.find({id: req.params.id},function(err, result){
    
    if (err) return res.status(500).jsonp({status: 'err', err: err});

    result[0].keberangkatan = req.body.keberangkatan;
    result[0].harga = req.body.harga;

    result[0].save(function (err) {
      if (err) res.status(500).jsonp({status: 'err'});
      res.status(200).jsonp({status: 'ok'});
    });

  });
});


module.exports = router;
