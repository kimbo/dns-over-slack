var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var rateLimit = require("express-rate-limit");

var digRouter = require('./routes/dig');
var authRouter = require('./routes/auth');
var slackVerifyMiddleware = require('./slack');

var app = express();

var limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
// apply rateLimiting to all requests
app.use(limiter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(slackVerifyMiddleware);
app.use('/dig', digRouter);
app.use('/dig', authRouter);

module.exports = app;
