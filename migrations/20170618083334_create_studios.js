'use strict';
exports.up = function (knex, Promise) {
  return knex.schema.createTable('studios', (t) => {
    t.increments('id').unsigned().primary();
    t.timestamps();
    t.dateTime('deleted_at').nullable();

    t.string('name').notNull();
    t.string('slug').notNull();
    t.unique('slug');
    t.text('description').nullable();
    t.json('links').nullable();
    t.boolean('active').notNull().defaultTo(true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('studios');
};
