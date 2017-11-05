var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var markdown = require('markdown').markdown;

var index = require('./routes/index');
var edit = require('./routes/edit');
var users = require('./routes/users');

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

app.use('/', index);
app.use('/edit', edit);
app.use('/users', users);

app.use(function(req, res, next) {
  fs.readFile(__dirname + '/content' + req.url + '.md', "utf-8", (fileError, fileData) => {
    if (fileError) {
      // catch 404 and forward to error handler
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    } else {
      res.locals.content = markdown.toHTML(fileData);
      res.render('content');
    }
  });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // ejs で扱える変数は、 res.locals に入れます。
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
