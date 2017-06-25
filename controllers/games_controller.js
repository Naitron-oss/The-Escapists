'use strict';
const Game = require('../models/game');

exports.getGames = function (req, res, next) {
  Game.find().exec((err, games) => {
    if (err) { return next(err); }

    res.json(games);
  });
}
