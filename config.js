require( 'dotenv' ).config();
const pjson = require( './package.json' );

const config = {
	app: {
		port: process.env.PORT || 5000,
		version: `${ pjson.name }@${ pjson.version }`,
		baseRoute: process.env.BASE_ROUTE || '/v1',
		silent: process.env.NODE_ENV === 'test',
		logLevel: process.env.LOG_LEVEL || ( process.env.NODE_ENV === 'production' ? 'error' : 'info' ),
		shortEnv: process.env.SHORT_ENV,
	},
	sentry: {
		dsn: process.env.SENTRY_DSN,
		environment: process.env.SENTRY_ENVIRONMENT,
	},
	swagger: {
		swaggerURL: process.env.SWAGGER_URL || '/swagger/api-docs',
	},
	storage: {
		expiration: 3 * 60 * 1000, // 3 minutes
		bucket_name: `st-invoices-${process.env.SHORT_ENV || 'dev'}`
	}
};

module.exports = config;
