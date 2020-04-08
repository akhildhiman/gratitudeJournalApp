require("dotenv").config()  

const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose")


const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const gratitudeRouter = require('./routes/gratitudes');

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
  

// app.use(function(req, res, next) {
//   req.headers['if-none-match'] = 'no-match-for-this';
//   next();      
// });

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === "development") {
  const webpack = require("webpack");
  const webpackConfig = require("./webpack.config");
  const compiler = webpack(webpackConfig);

  app.use(
    require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );

  app.use(require("webpack-hot-middleware")(compiler));
}

mongoose.connect("mongodb://localhost:27017/gratitudeJournalApp", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, function(err) {
  if (err) {
    console.log("Not connected to the database")
  } else {
    console.log("Connected to the database")
  } 
})


app.use("/api/v1/users", userRouter)
app.use("/api/v1/gratitudes", gratitudeRouter)
app.use("/*", indexRouter)

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


module.exports = app;
