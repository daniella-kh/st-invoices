const request = require( 'supertest' );
const app = require( '../../app' );
const { userService } = require( '../../services' );

const { user, invalidUser } = require( './user.mock.json' );
const dbs = [ "sql", "mongo" ];
jest.mock( '../../services/user.service.js' )

userService.getUserFromSql.mockReturnValue( Promise.resolve( user ) )
userService.getUserFromRedis.mockReturnValue( Promise.resolve( user ) )
userService.getUserFromMongo.mockReturnValue( Promise.resolve( user ) )
userService.saveInRedis.mockResolvedValue( Promise.resolve( "ok" ) )
userService.saveInSql.mockResolvedValue( Promise.resolve( "ok" ) )
userService.saveInMongo.mockResolvedValue( Promise.resolve( "ok" ) )

describe( 'users routes', () => {

	for ( const db of dbs ){
		it( `get user from ${db}`, async ( done ) => {

			request( app )
				.get( `/v1/user/${db}/?email=${user.email}` )
				.expect( 200 )
				.then( res => {
					expect( res.body ).toEqual( user );
					done();
				} )
				.catch( err => done( err ) )
		} )

		it( `add user to ${db}`, async ( done ) => {

			request( app )
				.post( `/v1/user/${db}` )
				.send( user )
				.expect( 200 )
				.then( res => {
					expect( res.body ).toEqual( "ok" );

					done();
				} )
				.catch( err => done( err ) )
		} )
	}

	for ( const db of dbs ) {
		it( `add user fail ${db}`, async ( done ) => {
			userService[`saveIn${db.charAt( 0 ).toUpperCase() + db.slice( 1 )}`].mockRejectedValue( new Error( `${db} failed to save` ) )
			request( app )
				.post( `/v1/user/${db}` )
				.send( user )
				.expect( 500 )
				.then( res => {
					expect( res.body.error ).toEqual( `${db} failed to save` );

					done();
				} )
				.catch( err => done( err ) )
		} )
	}

	for ( const db of dbs ) {
		it( `user not found in ${db}`, async ( done ) => {
			userService[`getUserFrom${db.charAt( 0 ).toUpperCase() + db.slice( 1 )}`].mockResolvedValue( Promise.resolve( null ) )
			request( app )
				.get( `/v1/user/${db}?email=${user.email}` )
				.expect( 404 )
				.then( res => {
					expect( res.body ).toEqual( { "error": "User not found", "status": "failed" } );

					done();
				} )
				.catch( err => done( err ) )
		} )
	}

	it( 'add user with invalid data', async ( done ) => {
		request( app )
			.post( '/v1/user/sql' )
			.send( invalidUser )
			.expect( 400 )
			.then( res => {
				expect( res.body.errors ).toEqual( [
					{ "username": "Invalid username can't be empty" },
					{ "username": "Invalid username must be alphanumeric" },
					{ "email": "Invalid must be email" },
					{ "password": "Invalid must at least 5 characters" }
				] );

				done();
			} )
			.catch( err => done( err ) )
	} )

	it( 'add user with invalid db params', async ( done ) => {
		request( app )
			.post( '/v1/user/test' )
			.send( user )
			.expect( 400 )
			.then( res => {
				expect( res.body.errors ).toEqual( [
					{ "db": "invalid db param" }
				] );

				done();
			} )
			.catch( err => done( err ) )
	} )

} )
