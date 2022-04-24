const mockKnex = require( 'mock-knex' );
const { isSqlConnected, sqlDb } = require( '../../db/mysql-connections' );

describe( 'sql connection', () => {

	it( 'is connected success', async ( done ) => {
		const result = await isSqlConnected();
		expect( result ).toBeTruthy();
		done();
	} );

	it( 'is connected fail', async ( done ) => {
		mockKnex.mock( sqlDb( 'test' ) );
		const tracker = mockKnex.getTracker();
		tracker.install();
		tracker.on( 'query', () => {
			throw new Error( 'test' );
		} );

		const result = await isSqlConnected();
		expect( result ).toBeFalsy();
		done();
	} );

} );
