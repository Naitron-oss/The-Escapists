'use strict';
const knex = require('../knex');

const email = 'test@example.com';

exports.seed = function (knex, Promise) {
  return knex.table('users').where({
    email: email
  }).then((rows) => {
    if (rows.length === 0) {
      return knex.table('users').insert({
        email: email,
        password_digest: 'jfaosifuoiasef ,mnvk djk',
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
  });
};
