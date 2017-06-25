'use strict';
require('dotenv').config();

const mongooseLib = require('mongoose');
const Users = require('./seeders/users.seeder');
const Studios = require('./seeders/studios.seeder');

mongooseLib.Promise = global.Promise || Promise;

// Export the mongoose lib
exports.mongoose = mongooseLib;

// Export the mongodb url
exports.mongoURL = process.env.MONGODB_URI;

/*
  Seeders List
  ------
  order is important
*/
exports.seedersList = {
  Users,
  Studios
};
