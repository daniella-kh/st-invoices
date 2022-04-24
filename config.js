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
	sql: {
		host: process.env.MYSQL_HOST,
		port: process.env.MYSQL_PORT || 3306,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE,
		pool: {
			min: process.env.MYSQL_POOL_MIN || 0,
			max: process.env.MYSQL_POOL_MAX || 2
		}
	},
	mongo: {
		host: process.env.MONGO_HOST || 'localhost',
		port: process.env.MONGO_PORT || 27017,
		dbName: process.env.MONGO_NAME || 'test',
		user: process.env.MONGO_USER,
		password: process.env.MONGO_PASSWORD,
		url: process.env.MONGO_URL || null, //Optional string_uri for defining connections
	},
	redis: {
		host: process.env.REDIS_HOST || '0.0.0.0',
		port: process.env.REDIS_PORT || 6379,
		password: process.env.REDIS_PASSWORD,
		db: process.env.REDIS_DATABASE_INDEX || 0,
		expiredAfter: process.env.REDIS_EXPIRED_MINUTES || 60,
	},
	sentry: {
		dsn: process.env.SENTRY_DSN,
		environment: process.env.SENTRY_ENVIRONMENT,
	},
	rookOut: {
		rookOutKey: process.env.ROOKOUT_KEY,
	},
	swagger: {
		swaggerURL: process.env.SWAGGER_URL || '/swagger/api-docs',
	}
};

module.exports = config;
