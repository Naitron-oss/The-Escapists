'use strict';
const express = require('express');
const accountAPI = express.Router();
const accountsController = require('../controllers/accounts_controller');

const passport = require('passport');
const passportService = require('../services/passport');
const requireLocalAuth = passport.authenticate('local', { session: false });
const requireJwtAuth = passport.authenticate('jwt', { session: false });

const usersController = require('../controllers/users_controller');

accountAPI.route('/sign_up')
  .post(usersController.createUser)

accountAPI.route('/sign_in')
  .post(requireLocalAuth, accountsController.signIn)

module.exports = accountAPI;
