'use strict';
const express = require('express');
const userAPI = express.Router();
const usersController = require('../controllers/users_controller');

userAPI.route('/users')
  .post(usersController.createUser)

module.exports = userAPI;
