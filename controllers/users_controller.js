'use strict';
const knex = require('../db/knex');
const User = require('../models/user');

exports.createUser = function createUser(req, res, next) {
  const { email, password } = req.body;

  let errors = User.validateUserAttributes(req.body);

  if (Object.keys(errors).length > 0) {

    res.status(422).json({ errors });

  } else {

    User.queryUsersbyEmail(email.toLowerCase()).then((rows) => {

      if (rows.length > 0) {

        res.status(422).json({ errors: { email: 'email is in use' } });

      } else {

        User.createUser(email, password).then(() => {
          res.json({ success: true });
        }).catch((error) => {
          return next(error);
        });

      }

    }).catch((error) => {
      return next(error);
    });
  }
}
