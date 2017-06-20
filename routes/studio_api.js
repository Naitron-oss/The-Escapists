const express = require('express');
const knex = require('../db/knex');
const studioAPI = express.Router();

studioAPI.get('/studios', (req, res) => {
  var queriedStudios = [];

  knex.select('id', 'name', 'slug', 'description', 'links')
    .table('studios')
    .where({ active: true })
    .whereNull('deleted_at')
    .then((studios) => {
      queriedStudios = queriedStudios.concat(studios);

      var locationPromises = [];
      queriedStudios.forEach((studio) => {
        locationPromises.push(queryLocation(studio));
      });

      return Promise.all(locationPromises);
    }).then((queryLocations) => {
      queryLocations.forEach((locations) => {
        let matchStudio = queriedStudios.find((studio) => {
          return studio.id == locations[0].studio_id;
        });

        if (matchStudio) { matchStudio.locations = locations; }
      });

      return queryGames(queriedStudios.map((studio) => studio.id));
    }).then((queryGames => {
      queryGames.forEach((game) => {
        var matchStudio = queriedStudios.find((studio) => studio.id == game.studio_id)

        if (matchStudio.locations) {
          let matchLocation = matchStudio.locations.find((location) => location.id == game.location_id)

          if (!(matchLocation && matchLocation.games)) {
            matchLocation.games = [];
          }

          matchLocation.games.push(game);
        }
      });

      res.send(queriedStudios);
    }));
});


function queryLocation(studio) {
  return knex.select('id', 'address', 'phone_numbers', 'longitude', 'latitude', 'name', 'description', 'studio_id')
    .table('locations')
    .where({ active: true, studio_id: studio.id })
    .whereNull('deleted_at');
}

function queryGames(studioIds) {
  return knex.select('games.id', 'games.location_id', 'locations.studio_id', 'games.name', 'games.slug', 'games.description', 'games.story', 'games.player_quantity', 'games.price', 'games.available_preservation', 'games.link')
    .from('games')
    .leftJoin('locations', 'games.location_id', 'locations.id')
    .whereIn('locations.studio_id', studioIds)
}

module.exports = studioAPI;
