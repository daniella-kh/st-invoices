function getHello() {
	return 'Hello 🌍';
}

function getParams( params ) {
	return params;
}

function getQuery( query ) {
	return query;
}

function getHeaders( headers ) {
	return headers;
}

function getBody( body ) {
	return body;
}

function getError() {
	return {
		error: [
			{
				value: 'Error',
			},
		],
	};
}

function getAuthorization( headers ) {
	if ( headers.authorization ) {
		return headers?.authorization;
	}
	throw new Error( 'Unauthorized' );
}

module.exports = {
	getAuthorization,
	getBody,
	getError,
	getHeaders,
	getHello,
	getParams,
	getQuery,
};
