const { sql } = require( '../config' );
const { logger } =require( '../utils/logger' );

const mysqlConnection = () => {

	const sqlDb = require( './mysql' )( sql );

	const isSqlConnected = async () => {
		let isConnect = false;
		try {
			await sqlDb.raw( 'select 1+1' );
			const dbConn = sqlDb.client.connectionSettings;
			logger.info( `Sql connected to table ${ dbConn.database } with user ${ dbConn.user } on port ${ dbConn.port }` )
			isConnect = true
		} catch ( err ){
			logger.error( `Sql connection failed` );
			logger.error( err.message )
		} finally {
			return isConnect
		}

	}

	// isSqlConnected();

	return {
		sqlDb,
		isSqlConnected,
	}
}

module.exports = mysqlConnection();
