var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('welcome');
});

router.get('/v2-test', function(req, res, next) {
  res.render('pwc/call/v2/index');
});

router.get('/v3-test', function(req, res, next) {
  res.render('pwc/call/v3/index');
});

router.get('/pwc-voice', function(req, res, next) {
  res.render('pwc/integration');
});

module.exports = router;
