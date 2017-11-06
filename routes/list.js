var express = require('express');
var router = express.Router();
var config = require('../config');

var fs = require('fs');
var path = require('path');

/* ページ一覧画面 */
router.get('/', function(req, res, next) {
  fs.readdir(path.resolve('content'), function(directoryError, directoryList) {
    if (directoryError) {
      var err = new Error('Cannot Read content Directory!');
      err.status = 500;
      next(err);
    }
    var pageList = new Array();
    directoryList.forEach(function(page) {
      pageList.push(path.basename(page, '.md')); // basename 関数の2つ目の引数に拡張子を指定すると、拡張子が外れた形で返してもらえます。
    });
    res.render('view', {
      title: 'ページの一覧',
      mode: 'list',
      siteConfig: config,
      pageList: pageList
    });
  });
});

module.exports = router;
