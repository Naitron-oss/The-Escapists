const express = require('express');
const knex = require('../db/knex');
const locationAPI = express.Router();

locationAPI.get('/locations', (req, res) => {
  knex.select('id', 'address', 'phone_numbers', 'longitude', 'latitude', 'name', 'description', 'studio_id')
    .table('locations')
    .where({ active: true })
    .then(function (locations) {
      res.json(locations);
  });
});

module.exports = locationAPI;
