const Pool = require('pg').Pool
const pool = new Pool({
    user:'Kevin',
    host:'localhost',
    database:'PlutoDB',
    password:'password123',
    port: 5432,
})

module.exports = pool;