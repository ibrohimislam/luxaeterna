var express = require('express');
var router = express.Router();

router.get('/pool/:tujuan_id/:asal_id', function(req, res, next) {
  req.models.rute.all({asal_id: req.params.asal_id, tujuan_id: req.params.tujuan_id}, function(err, result) {
    if (err) res.status(500).jsonp({status: 'err', err: err});
    res.status(200).jsonp({status: 'ok', result: result});
  });
});

module.exports = router;