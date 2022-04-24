const request = require( 'supertest' );
const app = require( '../../../app' );

const baseURL = '/v1/swagger-example';

describe( 'swagger example', () => {
	it( `get hello`, async ( done ) => {
		request( app )
			.get( `${ baseURL }/hello` )
			.expect( 200, JSON.stringify( 'Hello 🌍' ), done );
	} );

	it( `hello`, async ( done ) => {
		request( app )
			.get( `${ baseURL }/hello` )
			.expect( 200, JSON.stringify( 'Hello 🌍' ), done );
	} );

	it( `with-param`, async ( done ) => {
		request( app )
			.get( `${ baseURL }/with-param/123` )
			.expect( 200, JSON.stringify( { id: '123' } ), done );
	} );

	it( `with-param-enum`, async ( done ) => {
		request( app )
			.get( `${ baseURL }/with-param-enum/foo` )
			.expect( 200, JSON.stringify( { type: 'foo' } ), done );
	} );

	it( `with-query`, async ( done ) => {
		request( app )
			.get( `${ baseURL }/with-query?type=foo` )
			.expect( 200, JSON.stringify( { type: 'foo' } ), done );
	} );

	it( `with-special-header`, async ( done ) => {
		const headerName = 'Special-Header';
		const res = await request( app )
			.get( `${ baseURL }/with-special-header` )
			.set( headerName, 'foo' );

		expect( res.statusCode ).toEqual( 200 );
		expect( res.body ).toHaveProperty( headerName.toLowerCase(), 'foo' );
		done();
	} );

	it( `form`, async ( done ) => {
		request( app )
			.post( `${ baseURL }/form` )
			.send( 'foo=foo&bar=bar' )
			.expect( 200, JSON.stringify( { foo: 'foo', bar: 'bar' } ), done );
	} );

	it( `json`, async ( done ) => {
		const body = { foo: 'foo', bar: 'bar' };

		request( app )
			.post( `${ baseURL }/json` )
			.send( body )
			.expect( 200, JSON.stringify( body ), done );
	} );

	it( `bad-request`, async ( done ) => {
		request( app )
			.get( `${ baseURL }/bad-request` )
			.expect( 400, JSON.parse( '{"error":[{"value":"Error"}]}' ), done );
	} );

	it( `secured failed`, async ( done ) => {
		request( app )
			.get( `${ baseURL }/secured` )
			.expect( 500, { error: 'Unauthorized', status: 'failed' }, done );
	} );

	it( `secured success`, async ( done ) => {
		const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
			'.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ' +
			'.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
		request( app )
			.get( `${ baseURL }/secured` )
			.set( 'Authorization', `Bearer ${ jwt }` )
			.expect( 200, JSON.stringify( `Bearer ${ jwt }` ), done );
	} );
} );
	
