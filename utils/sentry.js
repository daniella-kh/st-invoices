const Sentry = require( '@sentry/node' );
const config = require( '../config' );

Sentry.init( {
	dsn: config.sentry.dsn,
	environment:  config.sentry.environment,
	release: config.app.version,
} );

module.exports = Sentry;
