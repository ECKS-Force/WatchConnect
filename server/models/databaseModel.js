const { Pool } = require('pg');
const databaseURI = require('./databaseURI')

const PG_URI = databaseURI;
const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};