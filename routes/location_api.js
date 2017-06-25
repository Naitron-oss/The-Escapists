'use strict';
const express = require('express');
const locationAPI = express.Router();
const locationsController = require('../controllers/locations_controller');

locationAPI.route('/locations')
  .get(locationsController.getLocations)

module.exports = locationAPI;
