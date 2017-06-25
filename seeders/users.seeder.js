'use strict';
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const User = require('../models/user');

const data = [
  {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    isAdmin: true,
    createdAt: new Date().getTime()
  }
]

exports.seed = function () {
  return data.forEach((data) => {
    User.findOne({ email: data.email }, (err, existingUser) => {
      if (err) { throw err; }

      if (existingUser) { return existingUser }

      const user = new User(data);

      user.save((err) => {
        if (err) { return next(err); }

        return user;
      })
    });
  });
}
