'use strict';
exports.up = function (knex, Promise) {
  return knex.schema.createTable('locations', (t) => {
    t.increments('id').unsigned().primary();
    t.timestamps();
    t.dateTime('deleted_at').nullable();

    t.bigInteger('studio_id').unsigned().index().references('id').inTable('studios');

    t.string('address').notNull();
    t.json('phone_numbers').nullable();
    t.decimal('longitude').notNull();
    t.decimal('latitude').notNull();
    t.string('name').notNull();
    t.text('description').nullable();
    t.boolean('active').notNull().defaultTo(true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('locations');
};
