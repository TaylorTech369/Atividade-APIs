const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: 'senai',
    host: 'localhost',
    database: 'express',
    port: '5433'
})

module.exports = pool
