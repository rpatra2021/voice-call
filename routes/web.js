var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('welcome');
});

router.get('/test', function(req, res, next) {
  res.render('pwc/test/index');
});

router.get('/pwc-voice', function(req, res, next) {
  res.render('pwc/integration');
});

module.exports = router;
