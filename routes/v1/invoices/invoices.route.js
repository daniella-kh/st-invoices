const express = require( 'express' );
const router = express.Router();
const { auth } = require( '@elementor/elementor-api' );

const { invoicesController } = require( '../../../controllers' );
const { postValidation, getValidation } = require( './invoices.validation' );

/**
 * @route POST /invoices/user/{user_id}/order/{order_id}
 * @summary Save invoice
 * @group invoices
 * @param {number} user_id.path.required  - User id - eg: 123
 * @param {number} order_id.path.required - Order id - eg: 456
 * @param {string} url.body.required      - downloadable url - eg: https://downloadlink.com
 * @produces application/json
 * @return {Response.model} 200 - ok
 */
router.post( '/user/:user_id/order/:order_id', postValidation, invoicesController.post );

/**
 * @route GET /invoices/order/{order_id}
 * @summary return invoice download URL
 * @group invoices
 * @param {number} order_id.path.required - Order id - eg: 456
 * @produces application/json
 * @return {Response.model} 200 - ok
 */
router.get( '/order/:order_id', auth.isLoggedInMiddleware, getValidation, invoicesController.get );

/**
 * @typedef Response
 * @property {string} URL - downloadable url - eg: https://downloadlink.com
 */

module.exports = router;
