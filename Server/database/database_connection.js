// const Pool = require('pg').Pool;
// const pool = new Pool({
// 	user: 'Kevin',
// 	host: 'localhost',
// 	database: 'PlutoDB',
// 	password: 'password123',
// 	port: 5432
// });

// module.exports = pool;


// require('dotenv').config();
// const Pool = require('pg').Pool;
// const pool = new Pool({
// 	user: 'kevin',
// 	host: 'localhost',
// 	database: 'plutoDB',
// 	password: 'password123',
// 	port: 5432
// });

// module.exports = pool;


require('dotenv').config();
const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'PlutoDB',
	password: 'BHXK7GNKR4',
	port: 5432
});

module.exports = pool;