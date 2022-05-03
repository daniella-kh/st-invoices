const { healthcheckService } = require( '../../services' );

describe( 'healthcheckService', () => {

	beforeAll( async ( done ) => {
		done();
	} )

	afterAll( done => {
		done();
	} )

	it( 'healthcheck', async ( done ) => {
		const healthcheck = await healthcheckService();
		expect( healthcheck.status ).toEqual( {} );
		expect( healthcheck.ready ).toBeTruthy();
		done();
	} )

	/*it( 'healthcheck fail', async ( done ) => {
		const healthcheck = await healthcheckService();
		expect( healthcheck.status ).toEqual( {} );
		expect( healthcheck.ready ).toBeFalsy();
		done();
	} )*/
} )
