'use strict';
const Studio = require('../models/studio');

function presentGames(studios) {
  let games = [];

  studios.forEach((studio) => {
    studio.games.filter((game) => game.active).forEach((game) => {
      let parsedGame = Object.assign(
        { studio_id: studio._id, studio_name: studio.name },
        JSON.parse(JSON.stringify(game))
      );
      games.push(parsedGame);
    })
  })

  return games;
}

exports.getGames = function (req, res, next) {
  Studio.find().select('id name games').exec((err, studios) => {
    if (err) { res.status(500).json(err); }

    if (studios.length > 0) {
      res.json(presentGames(studios));
    } else {
      res.status(404).json({ errors: ['Not Found'] });
    }
  });
}

