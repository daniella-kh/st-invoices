const { isSqlConnected } = require( '../db' ).sql;
const { isRedisConnected } = require( '../db' ).redis;
const { isMongoConnected } = require( '../db' ).mongo;

const healthcheck = async () => {

	const status = {
		sql: await isSqlConnected(),
		mongo: isMongoConnected(),
		redis: isRedisConnected()
	}
	const ready = status.sql && status.mongo;
	return { ready, status };
};

module.exports = healthcheck;
