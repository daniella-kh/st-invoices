const express = require( 'express' );
const router = express.Router();

const { invoiceController } = require( '../../../controllers' );
const { postValidation, getValidation } = require( './invoice.validation' );

/**
 * @route POST /invoice
 * @summary Save invoice
 * @group invoice
 * @param {Post.model} data.body
 * @produces application/json
 * @return {Response.model} 200 - ok
 */
router.post( '/', postValidation, invoiceController.post );

/**
 * @route GET /invoice/{user_id}/{order_id}
 * @summary return invoice download URL
 * @group invoice
 * @param {number} user_id.path.required  - User id - eg: 123
 * @param {number} order_id.path.required - Order id - eg: 456
 * @produces application/json
 * @return {Response.model} 200 - ok
 */
router.get( '/:user_id/:order_id', getValidation, invoiceController.get );

/**
 * @typedef Post
 * @property {number} user_id  - User id - eg: 123
 * @property {number} order_id - Order id - eg: 456
 * @property {string} url      - downloadable url - eg: https://downloadlink.com
 */

/**
 * @typedef Response
 * @property {string} URL - downloadable url - eg: https://downloadlink.com
 */

module.exports = router;
