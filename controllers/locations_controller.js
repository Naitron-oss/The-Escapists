'use strict';
const Location = require('../models/location');

exports.getLocations = function (req, res, next) {
  Location.find().populate('game').exec((err, locations) => {
    if (err) { return next(err); }

    res.json(locations);
  });
}
