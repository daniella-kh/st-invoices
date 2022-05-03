const request = require( 'supertest' );
const app = require( '../../app' );
const invoicesService = require( '../../services/invoices.service' );
const storageService = require( '../../services/storage.service' );

jest.mock( '../../services/storage.service.js' )

describe( 'invoices routes', () => {

	describe( 'file name', () => {
		it( 'valid', async ( done ) => {
			const result = await invoicesService.getFileName( 1, 2 );
			expect( result ).toEqual( "1/2.pdf" );
			done();
		} );
	} );

	describe( 'post', () => {

		it( 'valid', async ( done ) => {
			const url_from = "https://urlfrom.com";
			const filename_to = "1/2.pdf";
			storageService.uploadFromUrl.mockImplementationOnce( async ( _url_from, _filename_to ) => {
				expect( _url_from ).toEqual( url_from );
				expect( _filename_to ).toEqual( filename_to );

				return filename_to;
			} );
			const result = await invoicesService.post( 1, 2, url_from );
			expect( result ).toEqual( filename_to );
			done();
		} );

	} );

	describe( 'get', () => {

		it( 'valid', async ( done ) => {
			const filename = "1/2.pdf";
			storageService.download.mockImplementationOnce( async ( _filename ) => {
				expect( _filename ).toEqual( filename );
				return filename;
			} );
			const result = await invoicesService.get( 1, 2 );
			expect( result ).toEqual( filename );
			done();
		} );

	} );

} )
