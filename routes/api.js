const express = require('express');
const knex = require('../db/knex');
const API = express.Router();
const studioAPI = require('./studio_api');

API.get('/mock/studios', (req, res) => {
  studios = require('../db/seeds/seed_data');
  res.json(studios);
});

API.use('/v1', studioAPI);

module.exports = API;
