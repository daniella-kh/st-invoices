const createError = require( "http-errors" );
const { userService } = require( '../services' );
const { RESPONSE_CODES } = require( '../utils/enums' );

const addUser = async ( req, res, next ) => {
	const { db } = req.params;

	if ( db === "sql" )
		next( await userService.saveInSql( req.body ).catch( next ) );
	if ( db === "mongo" )
		next( await userService.saveInMongo( req.body ).catch( next ) )  ;
};

const getUser = async ( req, res, next ) => {
	const { email } = req.query;
	const { db } = req.params;

	if ( db === "sql" )
		next( await userService.getUserFromSql( email ).catch( next ) || createError( RESPONSE_CODES.NOT_FOUND, "User not found" ) );
	if ( db === "mongo" )
		next( await userService.getUserFromMongo( email ).catch( next ) || createError( RESPONSE_CODES.NOT_FOUND, "User not found" ) );
};

module.exports = {
	getUser,
	addUser
};
