'use strict';
const Studio = require('../models/studio');

function presentStudios(err, studios, res) {
  if (err) { res.status(500).json(err); }

  if (studios.length > 0) {
    res.json(studios);
  } else {
    res.status(404).json({ errors: ['Not Found'] });
  }
}

exports.getStudios = function (req, res, next) {
  if (req.query !== {}) {
    Studio.queryByArgs(req.query, (err, studios) => {
      presentStudios(err, studios, res);
    });

    return;
  }

  Studio.find().exec((err, studios) => {
    presentStudios(err, studios, res);
  });
}
