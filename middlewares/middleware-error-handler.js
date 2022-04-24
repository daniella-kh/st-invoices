const { RESPONSE_CODES } = require( "../utils/enums" );
const { logger } = require( "../utils/logger" );

const errorHandler = ( err, req, res, next ) =>{
	let statusCode = RESPONSE_CODES.SERVER_ERROR;
	if ( err.statusCode ) {
		statusCode = err.statusCode;
	}

	res.status( statusCode );
	const message = { error: err.message, status: 'failed', ...err.custom_error };
	logger.error( message );

	if ( process.env.NODE_ENV === 'production' && statusCode === RESPONSE_CODES.SERVER_ERROR ) {
		res.json( { error: 'An unexpected error has occurred. Please contact support', status: 'failed' } );
	} else {
		res.json( message );
	}

	next();
}

module.exports = errorHandler;
