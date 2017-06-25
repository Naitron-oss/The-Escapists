'use strict';

const User = require('../models/user');

exports.signIn = function (req, res, next) {
  res.json({ token: User.generateToken(req.user) });
}
