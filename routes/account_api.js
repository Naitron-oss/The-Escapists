'use strict';
const express = require('express');
const accountAPI = express.Router();
const accountsController = require('../controllers/accounts_controller');

const passport = require('passport');
const passportService = require('../services/passport');
const requireLocalAuth = passport.authenticate('local', { session: false });

accountAPI.route('/sign_in')
  .post(requireLocalAuth, accountsController.signIn)

module.exports = accountAPI;
