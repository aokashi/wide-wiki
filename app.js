var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var marked = require('marked');

var config = require('./config');
var edit = require('./routes/edit');
var list = require('./routes/list');
var search = require('./routes/search');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/edit', edit);
app.use('/list', list);
app.use('/search', search);

app.use(function(req, res, next) {
  var fileURL = req.url;
  if (fileURL === '/') {
    fileURL += 'index'; // ルートの記事はindexから参照されます。
  }
  // contentディレクトリの中にmarkdownファイルを置きます。
  fs.readFile(path.join(__dirname, 'content', fileURL + '.md'), "UTF-8", function(fileError, fileData) {
    if (fileError) {
      res.locals.fileContent = fileURL.substr(1) + "の記事は見つかりませんでした。ツールバーの「編集」から新規作成ができます。";
    } else {
      res.locals.fileContent = marked(fileData);
    }
    res.render('view', {
      title: fileURL.substr(1),
      mode: 'content',
      siteConfig: config,
      fileName: fileURL.substr(1),
      fileURL: fileURL
    });
  });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
