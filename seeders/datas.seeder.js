'use strict';
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const Studio = require('../models/studio');
const data = require('./seed_data');

exports.seed = function () {
  return data.forEach((studio_data) => {
    let studio = {
      active: studio_data.active,
      name: studio_data.name,
      slug: studio_data.slug,
      description: studio_data.description,
      createdAt: new Date().getTime(),
      links: studio_data.links,
      games: studio_data.games
    };

    Studio.findOneAndUpdate({ slug: studio_data.slug }, studio, { upsert: true, new: true }, (err, savedStudio) => {
      if (err) { throw err; }

      return savedStudio
    });
  });
}
