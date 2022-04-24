const knex = require( 'knex' );

const mysql = ( settings ) => {
	const { host, port, user, password, database, pool } = settings;
	const poolN = +pool?.min < +pool?.max ? { min: +pool.min, max: +pool.max } : { min: 0, max: 2 };
	const db = knex( {
		client: 'mysql',
		connection: {
			port,
			host,
			user,
			password,
			database,
		},
		pool: poolN
	} );
	return db;
};
module.exports = mysql;
