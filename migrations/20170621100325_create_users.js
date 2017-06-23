'use strict';
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (t) => {
    t.increments('id').unsigned().primary();
    t.timestamps();
    t.dateTime('deleted_at').nullable();

    t.string('email').notNull();
    t.unique('email');
    t.string('password_digest').notNull();

    t.boolean('active').notNull().defaultTo(true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};
