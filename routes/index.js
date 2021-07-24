var express = require('express');
var router = express.Router();

const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SE_Aotzu Base' });
});

module.exports = router;
