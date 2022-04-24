const mysql = require( '../../db/mysql' );

describe( 'mysql client', () => {
	it( 'mysql pool max greater then min', async ( done ) => {
		const pool = { min: 0, max: 2 };
		const result = await mysql( 3306, '127.0.0.1', 1234, 1234, 'db', pool );
		expect( typeof result ).toBe( 'function' );
		expect( result.queryBuilder().client.pool ).toMatchObject( pool );
		done();
	} )

	it( 'mysql constructor without pool', async () => {
		const result = await mysql( 3306, '127.0.0.1', 1234, 1234, 'db' );
		expect( typeof result ).toBe( 'function' );
	} )
} )
