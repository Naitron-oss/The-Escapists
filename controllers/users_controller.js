'use strict';
const User = require('../models/user');

exports.createUser = function createUser(req, res, next) {
  const errors = User.validator(req.body);
  if (errors.length > 0) { return res.status(422).json({ errors }); }

  const { email, password } = req.body;

  User.findOne({ email: email.toLowerCase() }, (err, existingUser) => {
    if (err) { return next(err); }

    if (existingUser) { res.status(422).json({ errors: ['Email is in use'] }); }

    const user = new User({ email, password });

    user.save((err) => {
      if (err) { return next(err); }

      res.json({ success: true });
    })
  });
}
