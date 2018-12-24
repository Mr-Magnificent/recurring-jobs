const { Model } = require('objection');

console.log("hello");

let knex = require('knex')({
    client: 'mysql2',
    useNullAsDefault: true,
    connection: {
        host: '127.0.0.1',
        user: 'ayush',
        password: '1234',
        database: 'recurring'
    }
});

Model.knex(knex);

exports.db = knex;