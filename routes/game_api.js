const express = require('express');
const knex = require('../db/knex');
const gameAPI = express.Router();

gameAPI.get('/games', (req, res) => {
  knex.select()
    .table('games')
    .where({ active: true })
    .then(function (locations) {
      res.json(locations);
  });
});

module.exports = gameAPI;
