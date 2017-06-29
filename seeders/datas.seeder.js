'use strict';
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const Studio = require('../models/studio');
const Location = require('../models/location');
const Game = require('../models/game');

const data = require('./seed_data');

exports.seed = function () {
  return data.forEach((studio_data) => {
    let studio = {
      active: studio_data.active,
      name: studio_data.name,
      slug: studio_data.slug,
      description: studio_data.description,
      createdAt: new Date().getTime(),
      links: studio_data.links
    };

    Studio.findOneAndUpdate({ slug: studio_data.slug }, studio, { upsert: true, new: true }, (err, savedStudio) => {
      if (err) { throw err; }

      return studio_data.locations.forEach((location_data) => {
        let location = {
          active: location_data.active,
          name: location_data.name,
          description: location_data.description,
          createdAt: new Date().getTime(),
          address: location_data.address,
          phone_numbers: location_data.phone_numbers,
          longitude: location_data.longitude.toString(),
          latitude: location_data.latitude.toString(),
          ownedBy: savedStudio._id
        };

        Location.findOneAndUpdate({ name: location_data.name }, location, { upsert: true, new: true }, (err, savedLocation) => {
          if (err) { throw err; }

          return location_data.games.forEach((game_data) => {
            let game = {
              active: game_data.active,
              name: game_data.name,
              description: game_data.description,
              createdAt: new Date().getTime(),
              slug: game_data.slug,
              story: game_data.story,
              link: game_data.link,
              player_quantity: game_data.player_quantity,
              price: game_data.price,
              available_preservation: game_data.available_preservation,
              ownedBy: savedStudio._id,
              locatedAt: savedLocation._id,
            };

            Game.findOneAndUpdate({ slug: game_data.slug }, game, { upsert: true, new: true }, (err, savedGame) => {
              if (err) { throw err; }

              return savedGame;
            });
          });
        });
      });
    });
  });
}
