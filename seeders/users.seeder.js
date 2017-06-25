'use strict';
require('dotenv').config();

var Seeder = require('mongoose-data-seed').Seeder;
var Model = require('../models/user');

var data = [{
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  createdAt: new Date().getTime(),
  isAdmin: true
}];

var UsersSeeder = Seeder.extend({
  shouldRun: function () {
    return Model.count().exec().then(count => count === 0);
  },
  run: function () {
    return Model.create(data);
  }
});

module.exports = UsersSeeder;
