const { body } = require( 'express-validator' );
const { logger } = require( '../../utils/logger' );
const validate = require( '../../middlewares/middleware-validator' );

const isAvailableLogLevel = ( value ) => {
	const availableLogLevels = Object.keys( logger.levels.values );

	if ( ! availableLogLevels.includes( value ) ) {
		throw new Error( 'invalid log level' );
	}
	return true;
};

const logLevelValidationRules = [
	body( 'level' ).custom( isAvailableLogLevel ),

	validate
];

module.exports = {
	logLevelValidationRules,
};
