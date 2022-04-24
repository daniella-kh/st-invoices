const { body, param, query } = require( 'express-validator' );
const validate = require( '../../../middlewares/middleware-validator' );

const isAvailableDb = ( value ) => {
	const availableDbs = [ 'sql', 'mongo' ];

	if ( availableDbs.indexOf( value ) === -1 ){
		throw new Error( "invalid db param" );
	}
	return true;
}

const userValidationRules = [
	param( 'db' ).custom( isAvailableDb ),

	// username require
	body( 'username' )
		.trim()
		.notEmpty()
		.withMessage( "Invalid username can't be empty" )
		.isAlphanumeric()
		.withMessage( "Invalid username must be alphanumeric" ),

	// email must be an valid email
	body( 'email' )
		.isEmail()
		.withMessage( "Invalid must be email" ),

	// password must be at least 5 chars long
	body( 'password' )
		.isLength( { min: 5 } )
		.withMessage( "Invalid must at least 5 characters" ),

	validate
]

const getUserValidationRules = [
	param( 'db' ).custom( isAvailableDb ),

	// email must be an valid email
	query( 'email' )
		.isEmail()
		.withMessage( "Invalid must be email" ),

	validate
]

module.exports = {
	userValidationRules,
	getUserValidationRules,
}
