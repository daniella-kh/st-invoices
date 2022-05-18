const request = require( 'supertest' );
const app = require( '../../app' );
const invoicesService = require( '../../services/invoices.service' );

jest.mock( '../../services/invoices.service.js' )

describe( 'invoices routes', () => {

	describe( 'post', () => {

		it( 'missing url', async ( done ) => {
			request( app )
				.post( '/v1/invoices/user/1/order/1' )
				.send( {} )
				.expect( 400 )
				.then( res => {
					expect( res.body.errors ).toEqual( [ { url: 'Missing required field' } ] );
					done();
				} )
				.catch( err => done( err ) )
		} );

		it( 'invalid user id', async ( done ) => {
			request( app )
				.post( '/v1/invoices/user/a/order/1' )
				.send( { "url": "https://url.com" } )
				.expect( 400 )
				.then( res => {
					expect( res.body.errors ).toEqual( [ { user_id: 'Invalid user id must be number' } ] );
					done();
				} )
				.catch( err => done( err ) )
		} );

		it( 'invalid order id', async ( done ) => {
			request( app )
				.post( '/v1/invoices/user/1/order/a' )
				.send( { "url": "https://url.com" } )
				.expect( 400 )
				.then( res => {
					expect( res.body.errors ).toEqual( [ { order_id: 'Invalid order id must be number' } ] );
					done();
				} )
				.catch( err => done( err ) )
		} );

		it( 'valid', async ( done ) => {
			const url = "https://url.com";
			invoicesService.post.mockImplementationOnce( async ( user_id, order_id, _url ) => {
				expect( user_id ).toEqual( "1" );
				expect( order_id ).toEqual( "2" );
				expect( _url ).toEqual( url );

				return { url };
			} );
			request( app )
				.post( '/v1/invoices/user/1/order/2' )
				.send( { url } )
				// code, res.body, final action
				//.expect( 200, { url }, done )
				.expect( 200 )
				.then( res => {
					expect( res.body ).toEqual( { url } );
					done();
				} )
				.catch( err => done( err ) )
		} );
	} );

	describe( 'get', () => {

		it( 'invalid user id', async ( done ) => {
			request( app )
				.get( '/v1/invoices/user/a/order/1' )
				.expect( 400 )
				.then( res => {
					expect( res.body.errors ).toEqual( [ { user_id: 'Invalid user id must be number' } ] );
					done();
				} )
				.catch( err => done( err ) )
		} );

		it( 'invalid order id', async ( done ) => {
			request( app )
				.get( '/v1/invoices/user/1/order/a' )
				.expect( 400 )
				.then( res => {
					expect( res.body.errors ).toEqual( [ { order_id: 'Invalid order id must be number' } ] );
					done();
				} )
				.catch( err => done( err ) )
		} );
	} );

	it( 'valid', async ( done ) => {
		const url = "https://url.com";
		invoicesService.get.mockImplementationOnce( async ( user_id, order_id ) => {
			expect( user_id ).toEqual( "1" );
			expect( order_id ).toEqual( "2" );

			return { url };
		} );
		request( app )
			.get( '/v1/invoices/user/1/order/2' )
			// code, res.body, final action
			//.expect( 200, { url }, done )
			.expect( 200 )
			.then( res => {
				expect( res.body ).toEqual( { url } );
				done();
			} )
			.catch( err => done( err ) )
	} );

} )
