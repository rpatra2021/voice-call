var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const HOME = require('@controller/homeController');

router.post('/call-start', HOME.callStart);
router.post('/call-end', HOME.callEnd);
router.get('/call-history', HOME.callHistory);

module.exports = router;