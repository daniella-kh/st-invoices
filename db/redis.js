const { promisify } = require( "util" );
const { createClient } = require( "redis" );
const { logger } = require( '../utils/logger' );
const config = require( '../config' ).redis;

const redisClient = () => {
	const EXPIRED_AFTER_MINUTES = config.expiredAfter;

	const client = createClient( {
		host: config.host,
		port: config.port,
		password: config.password,
		db: config.db,
	} );

	const getAsync = promisify( client.get ).bind( client );
	const setAsync = promisify( client.set ).bind( client );
	const delAsync = promisify( client.del ).bind( client );

	client.getAsync = async ( key ) => {
		if ( client.ready ){
			const objectData = await getAsync( key );
			if ( ! objectData ) {
				return;
			}
			return JSON.parse( objectData );
		}
	};

	client.setAsync = async ( key, value, expiredAfterMinutes = EXPIRED_AFTER_MINUTES ) => {
		if ( client.ready ){
			const result = await setAsync( key, JSON.stringify( value ) );
			if ( expiredAfterMinutes ) {
				client.expire( key, expiredAfterMinutes * 60 );
			}
			return result;
		}
	};

	client.delAsync = delAsync;

	client.on( "connect", () => {
		logger.info( `Redis Connect to ${ client.address }` );
	} );

	client.on( "error", ( error ) => {
		logger.error( error );
	} );

	/* istanbul ignore next */
	client.on( "end", () => {
		logger.info( 'Redis connection close' );
	} );

	/* istanbul ignore next */
	client.isRedisConnected = () => client.ready ;

	client.close = () => client.quit();

	return client;
};

module.exports = redisClient();
