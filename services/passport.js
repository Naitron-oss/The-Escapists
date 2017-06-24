'use strict';
require('dotenv').config();

const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const JwtOptions = {

};

const JwtLogin = new JwtStrategy(JwtOptions, (payload, done) => {
  User.queryUsersby({ id: payload.sub }).then((rows) => {
    if (rows.length == 0) {
      done(null, false);
    } else {
      done(null, row[0]);
    }
  }).catch((error) => { return done(error, false); });
});
