const express = require('express');
const knex = require('../db/knex');
const gameAPI = express.Router();

gameAPI.get('/games', (req, res) => {
  queryGames().then((games) => {
    res.json(games);
  });
});

function queryGames() {
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
    'studios.id as studio_id',
    'studios.name as studio_name',
    'studios.slug as studio_slug',
    'locations.name as location_name',
    'locations.address',
    'locations.phone_numbers',
  ])
    .from('games')
    .leftJoin('locations', 'games.location_id', 'locations.id')
    .leftJoin('studios', 'locations.studio_id', 'studios.id')
}

module.exports = gameAPI;
