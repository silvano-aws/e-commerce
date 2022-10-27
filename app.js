var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); //gravador de logs que s�o mostrados no console

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// ========== configurações do servidor ===============//
// view engine setup - usamos o EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//rotas
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

// para não ficar dando erro 440 no log por n�o achar o favicon.ico
app.use(function(req,res,next){
  if (req.url==='/favicon.ico'){
    res.writeHead(200,{'Contet-Type': 'image/x-icon'});
    res.end('');
  }else {
    next();
  }
});

module.exports = app;
