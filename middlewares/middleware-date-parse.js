const {  formatDate } = require( "../utils/helpers" );

const regex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/; // eslint-disable-line

function parseDateProperties ( data, parse ) {

	const formatter = ( obj, format ) => {
		let parseObj = { }

		if ( typeof obj === 'string' && regex.exec( obj ) !== null ){
			parseObj = formatDate( obj, format )
		} else if ( ! ( typeof obj === 'object' ) && ! ( obj instanceof Array ) ) {
			parseObj = obj
		} else {
			for ( const k in  obj  ) {
				if ( typeof obj[ k ] === 'object' && obj[ k ] !== null && ! ( obj[ k ] instanceof Date ) && ! ( obj[ k ] instanceof Array ) ) {
					parseObj[ k ] = formatter( obj[ k ], format )
				} else if ( typeof obj[ k ] === 'string' && regex.exec( obj[ k ] ) !== null ) {
					parseObj[ k ] = formatDate( obj[ k ], format )
				} else if ( ( obj[ k ] instanceof Array ) ) {
					parseObj[ k ] = obj[ k ].map( item => formatter( item, format ) );
				} else {
					parseObj[ k ] = obj[ k ];
				}
			}
		}

		return parseObj
	}

	return ( data instanceof Array ) ? data.map( item => formatter( item, parse ) ) : formatter( data, parse )

}

const dateParse = ( result, req, res, next ) => {
	const { date_format } = req.query;

	if ( date_format &&  ! ( result instanceof Error ) ) {
		next( parseDateProperties( result, date_format ) )
	} else {
		next( result )
	}

};

module.exports = dateParse;
