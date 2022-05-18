const pg = {
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        user: 'diego',
        password: '123456789',
        database: 'bancoJs'
    },
    migrations: {
        tableName: 'users'

    }
}
const mysql = {
    client: 'mysql2',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'diego',
        password: '123456789',
        database: 'curso'
    }
}
const knex = require('knex')(mysql);
module.exports = knex;