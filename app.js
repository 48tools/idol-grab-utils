const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

const isProd = app.get('env') === 'production'

const resolve = file => path.resolve(__dirname, file)


const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

app.set('trust proxy', 'loopback');

app.use('/static', serve('/dist/static', true));

if (isProd) {
  app.use(logger('combined'));
} else {
  app.use(logger('dev'));
}

app.use(cookieParser());


// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('helmet')())


// catch 404 and forward to error handler
app.use(function(req, res) {
  res.status(404).json({
    message: 'not found'
  })
});

// error handler
if (!isProd){
  app.use(function (err, req, res) {
    // console.error(err);

    const status = err.status || (err.response && err.response.status)
    console.log('status', status)

    if (res.headersSent) return;
    res.status(status || 500).json({
      message: err.message,
      err,
    })
  })
} else {
  app.use(function(err, req, res) {
    // console.error(err);
    const status = err.status || (err.response && err.response.status)

    console.log('status', status)
    if (res.headersSent) return;

    res.status(status || 500).json({
      message: err.message,
    })
  });
}

module.exports = app;
