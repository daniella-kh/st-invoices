const { DateTime } = require( "luxon" );

const dateToIsoString = ( value ) => {
	let isoString;
	switch ( typeof value ) {
		case 'object':
			if ( value instanceof Date ) {
				//value is Date object
				isoString = value.toISOString();
			}
			break;
		case 'string':
			if ( value !== "0" ) {
				if ( /^\d+$/.test( value ) ) {
					//value is unix timestamp
					value = parseInt( value ) * 1000;
				}
				isoString = new Date( value ).toISOString();
			}
			break;
	}
	return isoString;
};

const formatDate = ( date, date_format = "yyyy-MM-dd'T'HH:mm:ss'Z'" ) => DateTime.fromISO( date ).toFormat( date_format );

module.exports = {
	dateToIsoString,
	formatDate
};
