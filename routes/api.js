var express = require('express');
var router = express.Router();

var version = 'v1'

var pool = require('./api/'+version+'/pool');
router.use('/'+version+'/pool', pool);

var rute = require('./api/'+version+'/rute');
router.use('/'+version+'/rute', rute);

var pemesanan = require('./api/'+version+'/pemesanan');
router.use('/'+version+'/pemesanan', pemesanan);

var pencarian = require('./api/'+version+'/pencarian');
router.use('/'+version+'/pencarian', pencarian);

module.exports = router;
