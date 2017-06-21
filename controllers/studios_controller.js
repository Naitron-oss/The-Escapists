'use strict';
const knex = require('../db/knex');

exports.getStudios = function (req, res) {
  var queriedStudios = [];

  knex.select('id', 'name', 'slug', 'description', 'links')
    .table('studios')
    .where({ active: true })
    .whereNull('deleted_at')
    .then((studios) => {
      queriedStudios = queriedStudios.concat(studios);

      return queryGames(queriedStudios.map((studio) => studio.id));
    }).then((queryGames => {
      queryGames.forEach((game) => {
        var matchStudio = queriedStudios.find((studio) => studio.id == game.studio_id)

        if (!(matchStudio && matchStudio.games)) {
          matchStudio.games = [];
        }
        matchStudio.games.push(game);
      });

      res.json(queriedStudios);
    }));
}

function queryGames(studioIds) {
  return knex.select([
    'games.id',
    'games.name',
    'games.slug',
    'games.description',
    'games.story',
    'games.player_quantity',
    'games.price',
    'games.available_preservation',
    'games.link',
    'locations.studio_id',
    'locations.name as location_name',
    'locations.address',
    'locations.phone_numbers',
  ])
    .from('games')
    .leftJoin('locations', 'games.location_id', 'locations.id')
    .whereIn('locations.studio_id', studioIds)
}
