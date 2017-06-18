'use strict';
exports.up = function (knex, Promise) {
  return knex.schema.createTable('games', (t) => {
    t.increments('id').unsigned().primary();
    t.timestamps();
    t.dateTime('deleted_at').nullable();

    t.bigInteger('location_id').unsigned().index().references('id').inTable('locations');

    t.string('name').notNull();
    t.string('slug').notNull();
    t.unique('slug');
    t.text('description').nullable();
    t.text('story').nullable();
    t.string('player_quantity').nullable();
    t.string('price').nullable();
    t.string('available_preservation').nullable();
    t.text('link').nullable();
    t.boolean('active').notNull().defaultTo(true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('games');
};
