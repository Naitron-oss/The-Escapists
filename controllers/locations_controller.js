'use strict';
const knex = require('../db/knex');

exports.getLocations = function (req, res) {
  knex.select('id', 'address', 'phone_numbers', 'longitude', 'latitude', 'name', 'description', 'studio_id')
    .table('locations')
    .where({ active: true })
    .then(function (locations) {
      res.json(locations);
    });
}
