var express = require('express');
var router = express.Router();

var version = 'v1'

var users = require('./api/'+version+'/users');

router.use('/'+version+'/users', users);

module.exports = router;
