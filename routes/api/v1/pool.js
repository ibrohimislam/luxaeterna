var express = require('express');
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

});


module.exports = router;
