
describe( 'config', () => {
	beforeEach( () => {
		jest.resetModules();
	} );

	it( 'init config from env', async ( done ) => {

		process.env.MYSQL_PORT = ''
		process.env.PORT = ''
		process.env.NODE_ENV = 'dev'
		process.env.LOG_LEVEL = ''
		process.env.MYSQL_HOST = 'localhost'
		process.env.MYSQL_USER = 'root'
		process.env.MYSQL_PASSWORD = 'test'
		process.env.MYSQL_DATABASE = 'db_test'
		process.env.MYSQL_POOL_MIN = '2'
		process.env.MYSQL_POOL_MAX = '4'
		process.env.MONGO_HOST = 'localhost'
		process.env.MONGO_PORT = '27017'
		process.env.MONGO_NAME = 'test'
		process.env.MONGO_USER ='root'
		process.env.MONGO_PASSWORD = '12345'
		process.env.MONGO_URL = 'mongodb://localhost:27017'
		process.env.REDIS_HOST = ''
		process.env.REDIS_PORT = ''
		process.env.REDIS_PASSWORD = '123456'
		process.env.REDIS_DATABASE_INDEX = ''
		process.env.SENTRY_DSN = 'localhost'
		process.env.SENTRY_ENVIRONMENT = 'dev';

		const config = require( '../config' );

		expect( config.app.port ).toBe( 5000 );
		expect( config.app.silent ).toBe( false );
		expect( config.app.logLevel ).toBe( 'info' );
		expect( config.sql.host ).toBe( 'localhost' );
		expect( config.sql.port ).toBe( 3306 );
		expect( config.sql.user ).toBe( 'root' );
		expect( config.sql.password ).toBe( 'test' );
		expect( config.sql.database ).toBe( 'db_test' );
		expect( config.sql.pool ).toEqual( { min: '2', max: '4' } );
		expect( config.mongo.port ).toEqual( '27017' );

		done();
	} )

	it( 'log level in production', async ( done ) => {

		process.env.NODE_ENV = 'production'
		process.env.LOG_LEVEL = ''

		const config = require( '../config' );

		expect( config.app.logLevel ).toBe( 'error' )

		done()
	} )

} )
