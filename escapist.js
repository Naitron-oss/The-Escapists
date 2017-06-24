'use strict';
require('dotenv').config();

const fetch = require('node-fetch');
const express = require('express');
const port = process.env.PORT || 3004;
const passport = require('passport');

const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// disable express powered by header
app.disable('x-powered-by');

app.set('port', port);

app.use(morgan(process.env.NODE_ENV || 'dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/public'));

app.use(passport.initialize());

// Routes =====================================================
require('./routes')(app, passport);

// 404 catch-all handler (middleware)
app.use(function (req, res, next) {
  res.status(404).send('Page not found');
});

// 500 error handler (middleware)
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(app.get('port'), () => {
  console.log('Express started, press Ctrl+C to exit.');
});
