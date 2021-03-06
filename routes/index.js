'use strict';
const express = require('express');
const router = express.Router();

const accountAPI = require('./account_api');
const studioAPI = require('./studio_api');
const gameAPI = require('./game_api');

module.exports = function (app, passport) {
  app.use('/api/v1', studioAPI);
  app.use('/api/v1', gameAPI);
  app.use('/api/v1', accountAPI);
}
