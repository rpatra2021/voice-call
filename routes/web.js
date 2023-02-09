var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('welcome');
});

router.get('/test', function(req, res, next) {
  res.render('test/index');
});

module.exports = router;
