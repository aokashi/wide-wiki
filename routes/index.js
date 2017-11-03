var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // 代わりに以下のコードを追加してもOK
  // res.locals.title = 'Express';
  // res.render('index');
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  res.locals.title = req.body.title;
  res.render('index');
});

function isFileExist(filePath) {
  try {
    fs.statSync(filePath);
    return true;
  } catch(e) {
    return false;
  }
  return false;
}

module.exports = router;
