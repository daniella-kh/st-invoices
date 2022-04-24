const app = require( './app' );
const config = require( './config' );
const { logger } = require( './utils/logger' );

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort( config.app.port );

/**
 * Listen on provided port
 */
const server = app.listen( port, () => logger.info( `${ config.app.version } Listening on port ${ port }` ) );

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort( val ) {
	const portNumber = parseInt( val, 10 );

	if ( isNaN( portNumber ) ) {
		// named pipe
		return val;
	}

	if ( portNumber >= 0 ) {
		// port number
		return portNumber;
	}

	return false;
}

const signals = [ 'SIGTERM', 'SIGINT', 'SIGUSR2' ];
signals.forEach( signal => {
	process.on( signal, () => {
		logger.error( { 'podKilled': signal, status: 'event start' } );
		server.close( () => {
			logger.error( { 'podKilled': signal, status: 'exit' } );
			process.exit( 0 );
		} );
	} );
} );
