var express = require('express');
var router = express.Router();
var config = require('../config');

/* 検索画面 */
router.get('/', function(req, res, next) {
  res.render('view',{
    title: 'ページの検索',
    mode: 'search',
    siteConfig: config
  });
});

module.exports = router;