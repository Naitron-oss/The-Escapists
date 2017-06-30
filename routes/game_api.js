'use strict';
const express = require('express');
const gameAPI = express.Router();
const gamesController = require('../controllers/games_controller');

gameAPI.route('/games')
  .get(gamesController.getGames)

module.exports = gameAPI;
