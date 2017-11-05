var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');

/* 編集画面 */
router.get('/*', function(req, res, next) {
  console.log(path.join(path.resolve('content'), req.url + '.md') + 'を開きます。');
  fs.readFile(path.join(path.resolve('content'), req.url + '.md'), "UTF-8", function(fileError, fileData) {
    var fileContent;
    if (fileError) {
      fileContent = "";
    } else {
      fileContent = fileData;
    }
    res.render('edit', {
      fileName: req.url.substr(1),
      fileURL: req.url,
      fileContent: fileContent
    })
  });
});

/* 編集を反映 */
router.post('/', function(req, res, next) {
  if (!req.body.url || !req.body.content) {
    var err = new Error('Wrong POST Method!');
    err.status = 403;
    next(err);
  }
  console.log(path.join(path.resolve('content'), req.body.url + '.md') + 'を書き込みます。');
  fs.writeFile(path.join(path.resolve('content'), req.body.url + '.md'), req.body.content, function(fileError) {
    if (fileError) {
      console.log('...書き込めませんでした。');
      var err = new Error('Cannot Write File!');
      err.status = 403;
      next(err);
    } else {
      console.log('...書き込みました。');
      res.redirect(req.body.url);
    }
  });
});

module.exports = router;
