const { DateTime } = require( "luxon" );

const errorHandler = require( '../middlewares/middleware-error-handler' );
const dateParse = require( '../middlewares/middleware-date-parse' );
const { formatDate, dateToIsoString } = require( '../utils/helpers' );

let mockResult;
let mockRequest;
let mockResponse;
let nextFunction;

const createResponseMock = () => {
	const res = {};
	res.status = jest.fn().mockReturnValue( res );
	res.json = jest.fn().mockReturnValue( res );
	return res;
};

describe( 'error middleware', () => {
	let mockError;
	nextFunction = jest.fn();

	beforeEach( () => {
		mockError = { message:"error message" };
		mockRequest = {};
		mockResponse = createResponseMock();
	} );

	it( 'normal error', async () => {

		const expectedResponse = {
			status: "failed", error: mockError.message
		};
		errorHandler( mockError, mockRequest, mockResponse, nextFunction );
		expect( mockResponse.status ).toBeCalledWith( 500 );
		expect( mockResponse.json ).toBeCalledWith( expectedResponse );
	} );

	it( 'production error', async () => {
		process.env.NODE_ENV = 'production'
		const expectedResponse = { "status": "failed", error: 'An unexpected error has occurred. Please contact support' };

		errorHandler( mockError, mockRequest, mockResponse, nextFunction );
		expect( mockResponse.status ).toBeCalledWith( 500 );
		expect( mockResponse.json ).toBeCalledWith( expectedResponse );
	} );
} );

describe( 'middleware date parse', () => {

	beforeEach( () => {
		mockResult = {}
		mockRequest = { query:{} };
		nextFunction = jest.fn();
		mockResponse = {
			status: jest.fn().mockReturnValue( {} ),
			json: jest.fn().mockReturnValue( {} ),
		};
	} );

	it( 'date parse query null - call next', async ( done ) => {

		dateParse( mockResult, mockRequest, mockResponse, nextFunction );
		expect( nextFunction ).toBeCalledWith( mockResult );
		expect( nextFunction ).toBeCalledTimes( 1 );

		done();
	} );

	it( 'date parse x query with date string', async ( done ) => {
		const date = new Date().toISOString();
		const obj = { date };
		const result = { date: formatDate( date, "x" ) };
		const req = { query:{ date_format: "x" } };

		dateParse( obj, req, mockResponse, nextFunction );
		expect( nextFunction ).toBeCalledWith( result );
		expect( nextFunction ).toBeCalledTimes( 1 );

		done();
	} );

	it( 'date parse with array of object', async ( done ) => {
		const date = new Date().toISOString();
		const array = [ { date }, { date } ];
		const result = [ { date: formatDate( date, "x" ) }, { date: formatDate( date, "x" ) } ];
		const req = { query:{ date_format: "x" } };

		dateParse( array, req, mockResponse, nextFunction );
		expect( nextFunction ).toBeCalledWith( result );
		expect( nextFunction ).toBeCalledTimes( 1 );

		done();
	} );

	it( 'date parse with array of string', async ( done ) => {
		const date = new Date().toISOString();
		const array = [ { date }, { date }, { arr: [ "aa", "bb", date ] } ];
		const result = [ { date: formatDate( date, "x" ) }, { date: formatDate( date, "x" ) }, { arr: [ "aa", "bb", formatDate( date, "x" ) ] } ];
		const req = { query:{ date_format: "x" } };

		dateParse( array, req, mockResponse, nextFunction );
		expect( nextFunction ).toBeCalledWith( result );
		expect( nextFunction ).toBeCalledTimes( 1 );

		done();
	} );

	const formats = [ "MMM dd HH:mm:ss", "x", "HH:mm:ss",  "yy-MM-dd", "MM/dd/yyyy ", "yyyy-MM-dd'T'HH:mm:ss'Z'" ];
	for ( const format of formats ){
		it( `date parse ${format} query`, async ( done ) => {
			const date = new Date().toISOString();
			const obj = {
				"post_modified": date,
				"post_modified_gmt": date,
				"billing": {
					"updated": date,
				}
			}
			const result = {
				"post_modified":  DateTime.fromISO( date ).toFormat( format ),
				"post_modified_gmt": DateTime.fromISO( date ).toFormat( format ),
				"billing": {
					"updated": DateTime.fromISO( date ).toFormat( format ),
				}
			};

			const req = { query:{ date_format: format } };

			dateParse( obj, req, mockResponse, nextFunction );
			expect( nextFunction ).toBeCalledWith( result );
			expect( nextFunction ).toBeCalledTimes( 1 );

			done();
		} );
	}

	it( 'date to iso string and parse', async ( done ) => {
		const date = new Date( "2020-01-01T00:00:00.000Z" );
		const object = {
			created: dateToIsoString( date ),
			updated: dateToIsoString(  date.toString() ),
			join: dateToIsoString( ( date.getTime() / 1000 ).toFixed( 0 ).toString() ),
			last: dateToIsoString()
		};
		const result = {
			created: DateTime.fromJSDate( date ).toFormat( "yyyy-MM-dd'T'HH:mm:ss'Z'" ),
			updated: DateTime.fromJSDate( date ).toFormat( "yyyy-MM-dd'T'HH:mm:ss'Z'" ),
			join: DateTime.fromJSDate( date ).toFormat( "yyyy-MM-dd'T'HH:mm:ss'Z'" ),
			last: undefined
		};
		const req = { query:{ date_format: "yyyy-MM-dd'T'HH:mm:ss'Z'" } };

		dateParse( object, req, mockResponse, nextFunction );
		expect( nextFunction ).toBeCalledWith( result );
		expect( nextFunction ).toBeCalledTimes( 1 );

		done();
	} );
} );
