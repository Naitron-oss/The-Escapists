'use strict';
const Studio = require('../models/studio');

exports.getStudios = function (req, res, next) {
  Studio.find().populate('game').exec((err, studios) => {
    if (err) { return next(err); }

    res.json(studios);
  });
}
