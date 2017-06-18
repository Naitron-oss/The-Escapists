'use strict';
module.exports = {
  test: {
    client: 'postgresql',
    connection: {
      database: 'escapist_test'
    },
    pool: {
      min: 2,
      max: 10
    },
    seeds: {
      directory: './db/seeds'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  development: {
    client: 'postgresql',
    connection: {
      database: 'escapist_development'
    },
    debug: true,
    pool: {
      min: 2,
      max: 10
    },
    seeds: {
      directory: './db/seeds'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    seeds: {
      directory: './db/seeds'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
