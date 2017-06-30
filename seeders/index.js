'use strict';

const Users = require('./users.seeder');
const Datas = require('./datas.seeder');

exports.seed = () => {
  Users.seed();
  Datas.seed();
}
