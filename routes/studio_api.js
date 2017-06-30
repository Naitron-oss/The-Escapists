'use strict';
const express = require('express');
const studioAPI = express.Router();
const studiosController = require('../controllers/studios_controller');

studioAPI.route('/studios')
  .get(studiosController.getStudios)

module.exports = studioAPI;
