var express = require('express');
var router = express.Router();

var qr = require('qr-image');  

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Arnes Reservation' });
});

router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'Admin page' });
});

router.get('/qr/:code', function(req, res) {  
  var code = qr.image(req.params.code, { type: 'svg' });
  res.type('svg');
  code.pipe(res);
});

router.get('/barcode/:code', function(req, res) {  
	var barcode = require('barcode');
	var code39 = barcode('code39', {
		data: req.params.code,
		width: 400,
		height: 100,
	});

	code39.getStream(function (err, readStream) {
		if (err) throw err;
		readStream.pipe(res);
	});

});

module.exports = router;