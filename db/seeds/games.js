'use strict';
const studios = require('./seed_data');
const knex = require('../knex');

exports.seed = function (knex, Promise) {
  return knex.table('locations').returning('*')
    .then((rows) => {
      rows.forEach((row) => {
        var data_locations = [];
        studios.forEach((studio) => {
          data_locations = data_locations.concat(studio.locations);
        });

        var gamePromises = [];

        data_locations.find(location => location.address == row.address)
          .games.forEach((game) => {
            gamePromises.push(createOrUpdateGame(row.id, game));
          });

        return Promise.all(gamePromises);
      });
    });
};

function createOrUpdateGame(locationId, game) {
  return knex.table('games').where({
    location_id: locationId,
    slug: game.slug
  }).then((rows) => {
    if (rows.length > 0) {
      return knex.table('games').where({
        location_id: locationId,
        slug: game.slug
      }).update(gameAttributes(locationId, game)).returning('*');
    } else {
      return knex.table('games').insert(gameAttributes(locationId, game)).returning('*');
    }
  });
}

function gameAttributes(locationId, game) {
  return {
    location_id: parseInt(locationId),
    active: game.active,
    name: game.name,
    slug: game.slug,
    description: game.description,
    story: game.address,
    link: game.link,
    player_quantity: game.player_quantity,
    price: game.price,
    available_preservation: game.available_preservation,
    created_at: new Date(),
    updated_at: new Date()
  }
}
