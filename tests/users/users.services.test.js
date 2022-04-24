const { userService } = require( '../../services' )
const mockKnex = require( 'mock-knex' );
const mockingoose = require( 'mockingoose' );
const redis = require( '../../db/redis' );

const { user } = require( './user.mock.json' );

const tracker = mockKnex.getTracker();

describe( 'user service', () => {

	describe( 'sql', () => {
		let mockRedisGetAsync;

		beforeAll( async ( done ) => {
			tracker.install();
			mockRedisGetAsync = jest.spyOn( redis, 'getAsync' );
			done();
		} )

		afterAll( done => {
			tracker.uninstall();
			mockRedisGetAsync.mockRestore();
			done();
		} )

		beforeEach( async () => {
			await redis.delAsync( user.email )
		} )

		it( 'save in sql', async ( done ) => {
			tracker.on( 'query', ( query, step ) => {
				if ( step === 1 ){
					throw Error()
				} else {
					query.response( "OK" )
				}

			} )
			const result = await userService.saveInSql( user );
			expect( result ).toEqual( "OK" );
			done();
		} )

		it( 'get from sql', async ( done ) => {
			tracker.on( 'query', ( query ) => {
				query.response( [ user ] )
			} )
			const result = await userService.getUserFromSql( user.email );
			expect( result ).toEqual( user );
			done();
		} )

		it( 'get from sql not found', async ( done ) => {
			tracker.on( 'query', ( query ) => {
				query.response( [ ] )
			} )
			const result = await userService.getUserFromSql( user.email );
			expect( result ).toBeUndefined();
			done();
		} )

		it( 'get from sql return value from cache', async ( done ) => {
			await redis.setAsync( user.email, user );
			tracker.on( 'query', ( query ) => {
				query.response( [ ] )
			} )

			const result = await userService.getUserFromSql( user.email );

			expect( mockRedisGetAsync ).toHaveBeenCalledWith( user.email );
			expect( result ).toEqual( user );
			done();
		} )

		it( 'get from sql with redis service unavailable or user not in cache', async ( done ) => {
			mockRedisGetAsync.mockReturnValueOnce( undefined );
			tracker.on( 'query', ( query ) => {
				query.response( [ user ] )
			} )

			await expect( await userService.getUserFromSql( user.email ) ).toEqual( user );
			expect( mockRedisGetAsync ).toHaveBeenCalledWith( user.email );
			done();
		} )

		it( 'get from sql and cache user', async ( done ) => {
			const mockRedisSetAsync = jest.spyOn( redis, 'setAsync' );
			tracker.on( 'query', ( query ) => {
				query.response( [ user ] )
			} )

			await userService.getUserFromSql( user.email );
			expect( mockRedisSetAsync ).toHaveBeenCalledWith( user.email, user );

			mockRedisSetAsync.mockRestore();
			done();
		} )
	} )

	describe( 'mongo', () => {
		const doc = { ...user, _id: '507f191e810c19729de860ea' }
		mockingoose( userService.User ).toReturn( doc, 'findOne' );
		mockingoose( userService.User ).toReturn( doc, 'save' );

		it( 'save in mongo', async ( done ) => {
			const result = await userService.saveInMongo( user );
			expect( JSON.parse( JSON.stringify( result ) ) ).toMatchObject( doc );
			done();
		} )

		it( 'get from mongo', async ( done ) => {
			await redis.setAsync( user.email, user )
			const result = await userService.getUserFromMongo( user.email );
			expect( JSON.parse( JSON.stringify( result ) ) ).toMatchObject( doc );
			done();
		} )

		it( 'get from mongo not found', async ( done ) => {
			mockingoose( userService.User ).toReturn( undefined, 'findOne' );
			const result = await userService.getUserFromMongo( user.email );
			expect( result ).toBeUndefined();
			done();
		} )
	} )

	describe( 'redis', () => {
		beforeEach( async () => {
			await redis.delAsync( user.email )
		} )

		it( 'save in redis', async ( done ) => {
			const result = await userService.saveInRedis( user );
			expect( result ).toBe( "OK" );
			done();
		} )

		it( 'get from redis', async ( done ) => {
			await redis.setAsync( user.email, user )
			const result = await userService.getUserFromRedis( user.email );
			expect( result ).toStrictEqual( user );
			done();
		} )

		it( 'get from redis not found', async ( done ) => {
			const result = await userService.getUserFromRedis( user.email );
			expect( result ).toBeUndefined();
			done();
		} )
		it( 'redis not connected', async ( done ) => {
			redis.close();
			await expect( redis.setAsync( user.email ) ).resolves.toBeUndefined();
			await expect( redis.getAsync( user.email ) ).resolves.toBeUndefined();
			done();
		} )
	} )
} )
