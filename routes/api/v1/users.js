var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.models.users.all({}, function(err, result) {
    res.status(200).jsonp(result);
  });
});

router.get('/:id', function(req, res, next) {
  req.models.users.get(req.params.id, function(err, result) {
    res.status(200).jsonp(result);
  });
});

router.post('/:id', function(req, res, next) {
  console.log(req.body);
  res.send("");
});


module.exports = router;
