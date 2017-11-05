var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');

/* 汎用関数 */
function checkPageFile(path) {
  var result = true;
  var file = fs.open(path, 'r+', function(fileError, fd) {
    if (fileError) {
      result = false;
    } else {
      fs.close(fd);
    }
  });
  return result;
}
function writePageFile(path, content) {
  var result = true;
  console.log(path + 'を書き込みます。');
  fs.writeFile(path, content, function(fileError) {
    if (fileError) {
      console.log('...書き込めませんでした。');
      result = false;
    } else {
      console.log('...書き込みました。');
    }
  });
  return result;
}
function deletePageFile(path) {
  var result = true;
  console.log(path + 'を削除します。');
  fs.unlink(path, function(fileError) {
    if (fileError) {
      console.log('...削除できませんでした。');
      result = false;
    } else {
      console.log('...削除しました。');
    }
  });
  return result;
}

/* 編集画面 */
router.get('/*', function(req, res, next) {
  var fileURL = req.url;
  if (fileURL === '/') {
    fileURL += 'index';
  }
  console.log(path.join(path.resolve('content'), fileURL + '.md') + 'を開きます。');
  fs.readFile(path.join(path.resolve('content'), fileURL + '.md'), "UTF-8", function(fileError, fileData) {
    var fileContent = '';
    if (!fileError) {
      fileContent += fileData;
    }
    res.render('edit', {
      fileName: fileURL.substr(1),
      fileURL: fileURL,
      fileContent: fileContent
    })
  });
});

/* 編集を反映 */
router.post('/', function(req, res, next) {
  if (req.body.url == null || req.body.content == null) {
    var err = new Error('Wrong POST Method!');
    err.status = 403;
    next(err);
  }
  var filePath = path.join(path.resolve('content'), req.body.url + '.md');
  if(!req.body.content && checkPageFile(filePath)) { // 2つ目の条件はファイルが存在するか確認するため
    if (deletePageFile(filePath)) {
      res.redirect(req.body.url);
    } else {
      var err = new Error('Cannot Delete File!');
      err.status = 403;
      next(err);
    }
  } else {
    if (writePageFile(filePath, req.body.content)) {
      res.redirect(req.body.url);
    } else {
      var err = new Error('Cannot Write File!');
      err.status = 403;
      next(err);
    }
  }
});

module.exports = router;
