var express = require('express');
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

router.post('/:id', function(req, res, next) {
  console.log(req.body);
  res.send("");
});


module.exports = router;
