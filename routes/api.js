const express = require('express');
const API = express.Router();
const studioAPI = require('./studio_api');
const locationAPI = require('./location_api');
const gameAPI = require('./game_api');

API.use('/v1', studioAPI);
API.use('/v1', locationAPI);
API.use('/v1', gameAPI);

module.exports = API;
