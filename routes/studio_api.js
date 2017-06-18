const express = require('express');
const knex = require('../db/knex');
const studioAPI = express.Router();

studioAPI.get('/studios', (req, res) => {
  knex.select()
    .table('studios')
    .where({ active: true })
    .then(function (studios) {
     res.json(studios);
  });
});

module.exports = studioAPI;
