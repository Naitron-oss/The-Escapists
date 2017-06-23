'use strict';
const knex = require('../db/knex');
const bcrypt = require('bcrypt-nodejs');

function createUser(req, res) {
  console.log('hey yo')
  const { email, password } = req.body;

  let errors = validateUserAttributes(req.body);
  console.log('hey yoyo')
  if (Object.keys(errors).length > 0) {
    console.log('hey yoyoyo')
    res.json({ errors });
  } else {
    queryUsersby({ email: email.toLowerCase() }).then((rows) => {
      if (rows.length > 0) {
        res.json({ errors: { email: 'email already exists' } });
      } else {
        return createUser(options).then((rows) => {
          res.json({ response: 'ok' });
        });
      }
    });
  }
}

function validateUserAttributes(params) {
  const { email, password } = options;

  let errors = {};

  if (email.length === 0) { errors.email = 'email is required' }
  if (password.length === 0) { errors.password = 'password is required' }

  return errors;
}

function createUser({ email, password }) {
  return knex.table('users').insert({
    email: email,
    password_digest: 'hello', // bcrypt.hashSync(password, bcrypt.genSaltSync(8), null),
    created_at: new Date(),
    updated_at: new Date(),
  })
};

function queryUsersby(options) {
  return knex.select('*').table('users').where(options).whereNull('deleted_at').then(rows => rows);
}

module.exports = {
  createUser
}