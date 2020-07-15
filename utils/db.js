var pg = require('knex')({
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    pool: { min: 0, max: 5 },
    searchPath: ['knex', 'public'],
  });

module.exports = pg;