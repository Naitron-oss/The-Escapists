'use strict';
const studios = require('./seed_data');
const knex = require('../knex');

exports.seed = function (knex, Promise) {
  var studioPromises = []

  studios.forEach((studio) => {
    studioPromises.push(createOrUpdateStudio(studio));
  });

  return Promise.all(studioPromises);
};

function createOrUpdateStudio(studio) {
  return knex.table('studios').where({
    slug: studio.slug
  }).then((rows) => {
    if (rows.length > 0) {
      return knex.table('studios').where({
        slug: studio.slug
      }).update(studioArrtibutes(studio)).returning('*');
    } else {
      return knex.table('studios').insert(studioArrtibutes(studio)).returning('*');
    }
  }).then((rows) => {
    var locationPromises = [];
    studios.find(studio => studio.slug === rows[0].slug).locations.forEach((location) => {
      locationPromises.push(createOrUpdateLocation(rows[0].id, location));
    });
    return Promise.all(locationPromises);
  });
}

function studioArrtibutes(studio) {
  return {
    active: studio.active,
    name: studio.name,
    description: studio.description,
    slug: studio.slug,
    links: studio.links,
    created_at: new Date(),
    updated_at: new Date()
  }
}

function createOrUpdateLocation(studioId, location) {
  return knex.table('locations').where({
    studio_id: parseInt(studioId),
    name: location.name
  }).then((rows) => {
    if (rows.length > 0) {
      return knex.table('locations').where({
        studio_id: parseInt(studioId),
        name: location.name
      }).update(locationAttributes(studioId, location)).returning('*');
    } else {
      return knex.table('locations').insert(locationAttributes(studioId, location)).returning('*');
    }
  });
}

function locationAttributes(studioId, location) {
  return {
    studio_id: parseInt(studioId),
    active: location.active,
    name: location.name,
    description: location.description,
    address: location.address,
    phone_numbers: JSON.stringify(location.phone_numbers),
    longitude: location.longitude,
    latitude: location.latitude,
    created_at: new Date(),
    updated_at: new Date()
  }
}
