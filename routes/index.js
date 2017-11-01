var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // 代わりに以下のコードを追加してもOK
  // res.locals.title = 'Express';
  // res.render('index');
  res.render('index', { title: 'Express' });
});

module.exports = router;
