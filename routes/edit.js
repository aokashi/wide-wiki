var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/*', function(req, res, next) {
  fs.readFile(__dirname + '/../content' + req.url + '.md', "utf-8", (fileError, fileData) => {
    res.locals.title = req.url;
    if (fileError) {
      console.log(__dirname + '/../content' + req.url + '.md が見つかりませんでした。');
      res.locals.content = "";
    } else {
      console.log(__dirname + '/../content' + req.url + '.md を編集します。')
      res.locals.content = fileData;
    }
    res.render('edit');
  });
});

// ファイル保存
router.post('/', function(req, res, next) {
  fs.writeFile(__dirname + '/../content' + req.body.name + '.md', req.body.content, (fileError) => {
    if (fileError) {
      console.log(__dirname + '/../content' + req.body.name + '.md に書き込めませんでした。');
      var err = new Error('Cannot Write File');
      err.status = 403;
      next(err);
    } else {
      console.log(__dirname + '/../content' + req.body.name + '.md に書き込みました。')
      // 編集に成功したら、記事にリダイレクトしましょう。
      res.redirect(req.body.name);
    }
  });
});

module.exports = router;