const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'plutoDB',
	password: 'BHXK7GNKR4',
	port: 5432
});

module.exports = pool;



/**
 * 
 * const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'PlutoDB',
	password: 'BHXK7GNKR4',
	port: 5432
});

module.exports = pool;
 * 
 * 
 */