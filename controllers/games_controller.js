'use strict';
const Studio = require('../models/studio');

exports.getGames = function (req, res, next) {
  Studio.find().select('games').exec((err, studios) => {
    if (err) { res.status(500).json(err); }

    if (studios.length > 0) {
      res.json(studios);
    } else {
      res.status(404).json({ errors: ['Not Found'] });
    }
  });
}

