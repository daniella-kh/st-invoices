const promMid = require( 'express-prometheus-middleware' );

/**
 * @see https://www.npmjs.com/package/express-prometheus-middleware
 */
module.exports = promMid( {
	prefix: 'ba_boilerplate_',
} );
