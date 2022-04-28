const { body, param } = require( 'express-validator' );
const validate = require( '../../../middlewares/middleware-validator' );

const postValidation = [
	body( 'order_id', 'Missing required field' ).exists(),
	body( 'order_id', 'Invalid order id must be number' ).optional().isInt(),
	body( 'user_id', 'Missing required field' ).exists(),
	body( 'user_id', 'Invalid user id must be number' ).optional().isInt(),
	body( 'url', 'Missing required field' ).exists(),
	body( 'url', 'Invalid file must be url' ).optional().isString(),

	validate,
];

const getValidation = [
	param( 'order_id', 'Missing required field' ).exists(),
	param( 'order_id', 'Invalid order id must be number' ).optional().isInt(),
	param( 'user_id', 'Missing required field' ).exists(),
	param( 'user_id', 'Invalid user id must be number' ).optional().isInt(),

	validate,
];

module.exports = {
	postValidation,
	getValidation,
}
