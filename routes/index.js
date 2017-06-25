'use strict';
const express = require('express');
const router = express.Router();

const passportService = require('../services/passport');

const studioAPI = require('./studio_api');
const locationAPI = require('./location_api');
const gameAPI = require('./game_api');
const userAPI = require('./user_api');

module.exports = function (app, passport) {
  app.use('/api/v1', studioAPI);
  app.use('/api/v1', passportService.isAuthenticated, gameAPI);
  app.use('/api/v1', locationAPI);
  app.use('/api/v1', userAPI);
}
