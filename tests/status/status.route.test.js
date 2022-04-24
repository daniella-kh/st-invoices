const request = require( 'supertest' );
const app = require( '../../app' );
const { healthcheckService } = require( '../../services' );

jest.mock( '../../services/healthcheck.service.js' )

describe( 'status routes', () => {

	it( 'live should return success', async ( done ) => {

		request( app )
			.get( '/readiness' )
			.expect( 200 )
			.then( res => {
				expect( res.body ).toHaveProperty( 'status' );
				done();
			} )
			.catch( err => done( err ) )

	} )

	it( 'healthcheck 200', async ( done ) => {
		healthcheckService.mockReturnValue( {
			ready: true,
			status: {
				sql: true,
				redis: true
			}
		} )
		request( app )
			.get( '/liveness' )
			.expect( 200 )
			.then( res => {
				expect( res.body.ready ).toBeTruthy();
				expect( res.body.status.sql ).toBeTruthy();
				expect( res.body.status.redis ).toBeTruthy();
				done();
			} )
			.catch( err => done( err ) )

	} )

	it( 'healthcheck 500', async ( done ) => {
		healthcheckService.mockReturnValue( {
			ready: false,
			status: {
				sql: false,
				redis: true
			}
		} )

		request( app )
			.get( '/liveness' )
			.expect( 500 )
			.then( res => {
				expect( res.body.ready ).toBeFalsy();
				expect( res.body.status.sql ).toBeFalsy();
				expect( res.body.status.redis ).toBeTruthy();
				done();
			} )
			.catch( err => done( err ) )

	} )

	it( 'not found', async ( done ) => {

		request( app )
			.get( '/not/found' )
			.expect( 404 )
			.then( res => {
				expect( res.body ).toEqual( { "status": "failed", error: 'Not Found' } );
				done();
			} )
			.catch( err => done( err ) )

	} )

} )
