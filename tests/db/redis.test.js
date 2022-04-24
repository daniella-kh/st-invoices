const { RedisClient } = require( 'redis' );
const redisClient = require( '../../db/redis' );
const config = require( '../../config' );
const { promisify } = require( 'util' );

describe( 'redis connection', () => {
	const [ key, value ] = [ 'key', 'value' ];
	const EXPIRED_AFTER_MINUTES = 1;

	beforeAll( async ( done ) => {
		/// wait for redis to be ready
		await new Promise( resolve => setTimeout( resolve ) );
		done();
	} );

	describe( 'redisClient', function () {
		it( 'redisClient configured', () => {
			const { redis } = config;

			expect( redisClient.options ).toEqual( {
				host: redis.host,
				port: redis.port,
				password: redis.password,
				db: redis.db,
			} );
		} );

		it( 'redisClient methods', () => {
			expect( redisClient instanceof RedisClient ).toBeTruthy();
			expect( typeof redisClient.getAsync ).toBe( 'function' );
			expect( typeof redisClient.setAsync ).toBe( 'function' );
			expect( typeof redisClient.delAsync ).toBe( 'function' );
			expect( typeof redisClient.isRedisConnected ).toBe( 'function' );
			expect( typeof redisClient.close ).toBe( 'function' );
		} );
	} );

	describe( 'getAsync connection', () => {
		beforeEach( async ( done ) => {
			await redisClient.delAsync( key );
			done();
		} );

		it( 'key exist', async ( done ) => {
			await redisClient.setAsync( key, value );
			const result = await redisClient.getAsync( key );
			expect( result ).toEqual( value );
			done();
		} );

		it( 'key not exist', async ( done ) => {
			const result = await redisClient.getAsync( key );
			expect( result ).toBeUndefined();
			done();
		} );

		it( 'redis not connected should be undefined', async ( done ) => {
			redisClient.ready = false;
			const result = await redisClient.getAsync( key );
			expect( result ).toBeUndefined();
			redisClient.ready = true;
			done();
		} );

	} );

	describe( 'setAsync connection', () => {
		beforeEach( async ( done ) => {
			await redisClient.delAsync( key );
			done();
		} );

		it( 'set key', async ( done ) => {
			const result = await redisClient.setAsync( key, value, EXPIRED_AFTER_MINUTES );
			expect( result ).toBe( 'OK' );
			done();
		} );

		it( 'set key with ttl', async ( done ) => {
			await redisClient.setAsync( key, value, EXPIRED_AFTER_MINUTES );
			const ttl = promisify( redisClient.ttl ).bind( redisClient );
			const result = await ttl( key );
			expect( result ).toBeDefined()
			done();
		} );

		it( 'set key with ttl of 1 second', async ( done ) => {
			await redisClient.setAsync( key, value, 1 / 60 );
			await new Promise( resolve => setTimeout( resolve, 1500 ) );
			const result = await redisClient.getAsync( key );
			expect( result ).toBeUndefined();
			done();
		} );

		it( 'redis not connected should be undefined', async ( done ) => {
			redisClient.ready = false;
			const result = await redisClient.getAsync( key );
			expect( result ).toBeUndefined();
			redisClient.ready = true;
			done();
		} );
	} );

	describe( 'delAsync connection', () => {
		beforeEach( async ( done ) => {
			await redisClient.delAsync( key );
			done();
		} )

		it( 'delete key', async ( done ) => {
			const setResult = await redisClient.setAsync( key, value, EXPIRED_AFTER_MINUTES );
			expect( setResult ).toBe( 'OK' );

			let getResult = await redisClient.getAsync( key );
			expect( getResult ).toEqual( value );

			await redisClient.delAsync( key );
			getResult = await redisClient.getAsync( key );
			expect( getResult ).toBeUndefined();
			done();
		} );

	} );

	describe( 'status', () => {
		it( 'is connected', async ( done ) => {
			const result = await redisClient.isRedisConnected();
			expect( result ).toEqual( true );
			done();
		} );

		it( 'close connection', async ( done ) => {
			const result = await redisClient.close();
			expect( result ).toBeUndefined();
			expect( redisClient.connected ).toEqual( false );
			expect( redisClient.ready ).toEqual( false );
			done();
		} );

	} );
} );
