var express = require('express');
var router = express.Router();

/* ページ一覧画面 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
