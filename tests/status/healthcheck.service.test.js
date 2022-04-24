const { healthcheckService } = require( '../../services' );
const mockKnex = require( 'mock-knex' );
const mongo = require( '../../db/mongo' )

const tracker = mockKnex.getTracker();

jest.mock( '../../db/mongo' );

mongo.isMongoConnected.mockReturnValue( true );

describe( 'healthcheckService', () => {

	beforeAll( async ( done ) => {
		tracker.install();
		tracker.on( 'query', ( query ) => {
			if ( query.step === 2 ) {
				throw Error( 'error' )
			} else {
				query.response( )
			}

		} )
		done();
	} )

	afterAll( done => {
		tracker.uninstall();
		done();
	} )

	it( 'healthcheck', async ( done ) => {
		const healthcheck = await healthcheckService();
		expect( healthcheck.status ).toEqual( { sql: true, mongo:true, redis: true } );
		expect( healthcheck.ready ).toBeTruthy();
		done();
	} )

	it( 'healthcheck fail', async ( done ) => {
		const healthcheck = await healthcheckService();
		expect( healthcheck.status ).toEqual( { sql: false, mongo:true, redis: true } );
		expect( healthcheck.ready ).toBeFalsy();
		done();
	} )
} )
