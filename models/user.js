const knex = require('../db/knex');
const bcrypt = require('bcrypt-nodejs');

function encryptPassword(password, next) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

exports.validateUserAttributes = function (params) {
  let errors = {};

  const { email, password } = params;

  if (email === undefined || email.length === 0) { errors.email = 'email is required' }
  if (password === undefined || password.length === 0) { errors.password = 'password is required' }

  return errors;
}

exports.queryUsersby = function (options) {
  return knex.select('*').table('users').where(options).whereNull('deleted_at').then(rows => rows);
}

exports.queryUsersbyEmail = function (email) {
  return knex.select('*').table('users').whereRaw('LOWER("email") = ?', email).whereNull('deleted_at').then(rows => rows);
}

exports.createUser = function (email, password) {
  return knex.table('users').insert({
    email: email,
    password_digest: encryptPassword(password),
    created_at: new Date(),
    updated_at: new Date(),
  });
}