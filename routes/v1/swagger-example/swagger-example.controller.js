const exampleService = require( './swagger-example.service' );

function getHello( req, res, next ) {
	next( exampleService.getHello() );
}

function getParams( req, res, next ) {
	next( exampleService.getParams( req.params ) );
}

function getQuery( req, res, next ) {
	next( exampleService.getQuery( req.query ) );
}

function getHeaders( req, res, next ) {
	next( exampleService.getHeaders( req.headers ) );
}

function getBody( req, res, next ) {
	next( exampleService.getBody( req.body ) );
}

function getError( req, res ) {
	res.status( 400 ).send( exampleService.getError() );
}

function getAuthorization( req, res, next ) {
	next( exampleService.getAuthorization( req.headers ) );
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
