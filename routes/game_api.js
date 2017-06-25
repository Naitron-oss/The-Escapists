'use strict';
const express = require('express');
const gameAPI = express.Router();
const gamesController = require('../controllers/games_controller');

const passport = require('passport');
const passportService = require('../services/passport');
const requireJwtAuth = passport.authenticate('jwt', { session: false });

gameAPI.route('/games')
  .get(requireJwtAuth, gamesController.getGames)

module.exports = gameAPI;
