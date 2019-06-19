const ENV = process.env.NODE_ENV || 'development';
// const { user, password } = require('./config');

const dbConfig = {
  development: {
    client: 'pg',
    connection: {
      database: 'imdb'
      // user,
      // password
    },
    seeds: {
      directory: './db/seeds'
    }
  },
  test: {
    client: 'pg',
    connection: {
      database: 'imdb_test'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
};

module.exports = dbConfig[ENV];
