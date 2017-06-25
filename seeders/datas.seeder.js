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
    Studio.findOne({ slug: studio_data.slug }, (err, existingStudio) => {
      if (err) { throw err; }

      if (existingStudio) { return existingStudio }

      const studio = new Studio({
        active: studio_data.active,
        name: studio_data.name,
        slug: studio_data.slug,
        description: studio_data.description,
        createdAt: new Date().getTime(),
        links: studio_data.links
      });

      studio.save((err) => {
        if (err) { return next(err); }

        return studio_data.locations.forEach((location_data) => {
          Location.findOne({ name: location_data.name }, (err, existingLocation) => {
            if (err) { throw err; }

            if (existingLocation) { return existingLocation }
            const location = new Location({
              active: location_data.active,
              name: location_data.name,
              description: location_data.description,
              createdAt: new Date().getTime(),
              address: location_data.address,
              phone_numbers: location_data.phone_numbers,
              longitude: location_data.longitude.toString(),
              latitude: location_data.latitude.toString(),
              ownedBy: studio._id
            });

            location.save((err) => {
              if (err) { return next(err); }

              studio.locations.push(location._id);
              studio.save();

              return location_data.games.forEach((game_data) => {
                Game.findOne({ slug: game_data.slug }, (err, existingGame) => {
                  if (err) { throw err; }

                  if (existingGame) { return existingGame }
                  const game = new Game({
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
                    ownedBy: studio._id,
                    locatedAt: location._id,
                  });

                  game.save((err) => {
                    if (err) { return next(err); }

                    studio.games.push(game._id);
                    studio.save();
                    location.games.push(game._id);
                    location.save();
                    return game;
                  })
                });
              });
            })
          });
        });
      })
    });
  });
}
