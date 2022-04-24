const express = require( 'express' );
const router = express.Router();
const { getUserValidationRules, userValidationRules } = require( './user.validation' );
const { userController } = require( '../../../controllers' );

/**
 * @route GET /user/{db}
 * @summary This route returns the passed param
 * @param {enum} db.path - available db's - eg: sql,mongo
 * @param {string} email.query - user's email
 * @group User
 * @return {User.model} 200 - OK
 */
router.get( '/:db', getUserValidationRules, userController.getUser );

/**
 * @route POST /user/{db}
 * @summary This route returns the passed param
 * @param {enum} db.path.required - available db's - eg: sql,mongo
 * @param {User.model} data.body
 * @group User
 * @return 200 - OK
 */
router.post( '/:db', userValidationRules, userController.addUser );

module.exports = router;

/**
 * @typedef User
 * @property {string} username - - eg: John Doe
 * @property {string} email - - eg: johnd@elementor.com
 * @property {string} password - - eg: nZzbl2olEfBnGsjk
 */
