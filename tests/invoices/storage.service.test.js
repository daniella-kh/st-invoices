const storageService = require( '../../services/storage.service' );

describe( 'tests', () => {

	it( 'upload', async done => {
		const uploadResult = await storageService.upload();
		expect( uploadResult ).toBeUndefined();
		done();
	} );

	it( 'upload - return error', async done => {
		jest.fn().mockImplementationOnce( () => "../services/google-services", () => ( new Error() ) );
		const uploadResult = await storageService.upload();
		expect( uploadResult ).toBeUndefined();
		done();
	} );

	it( 'download', async done => {
		const uploadResult = await storageService.download();
		expect( uploadResult ).toBe( 'url' );
		done();
	} );
} );
