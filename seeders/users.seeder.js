'use strict';
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const User = require('../models/user');

const datas = [
  {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    isAdmin: true,
    createdAt: new Date().getTime()
  }
]

exports.seed = function () {
  return datas.forEach((data) => {
    User.findOneAndUpdate({ email: data.email }, data, { upsert: true } , (err, existingUser) => {
      if (err) { throw err; }

      if (existingUser) { return existingUser }
    });
  });
}
