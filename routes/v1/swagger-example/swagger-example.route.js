const express = require( 'express' );
const exampleController = require( './swagger-example.controller' );

const router = express.Router();

/* eslint "jsdoc/check-types": "off" */

/**
 * @route GET /swagger-example/hello
 * @summary This route returns Hello 🌍
 * @group Swagger example - swagger generator demo
 * @return {string} 200 - response message
 */
router.get( '/hello', exampleController.getHello );

/**
 * @route GET /swagger-example/with-param/{id}
 * @summary This route returns the passed param
 * @param {string} id.path.required
 * @group Swagger example - swagger generator demo
 * @return {Id.model} 200 - OK
 */
router.get( '/with-param/:id', exampleController.getParams );

/**
 * @route GET /swagger-example/with-param-enum/{type}
 * @summary This route returns the passed param
 * @param {enum} type.path.required - available types - eg: foo,bar
 * @group Swagger example - swagger generator demo
 * @return {Type.model} 200 - OK
 */
router.get( '/with-param-enum/:type', exampleController.getParams );

/**
 * @route GET /swagger-example/with-query
 * @summary This route returns passed query
 * @param {string} type.query.required
 * @group Swagger example - swagger generator demo
 * @return {Type.model} 200 - OK
 */
router.get( '/with-query', exampleController.getQuery );

/**
 * @route GET /swagger-example/with-special-header
 * @summary This route returns passed header
 * @param {string} Special-Header.header.required
 * @group Swagger example - swagger generator demo
 * @return {object} 200 - OK
 */
router.get( '/with-special-header', exampleController.getHeaders );

/**
 * @route POST /swagger-example/form
 * @summary This route accepts x-www-form-urlencoded
 * @group Swagger example - swagger generator demo
 * @param {string} foo.formData.required
 * @param {string} bar.formData.required
 * @produces application/json
 * @consumes application/x-www-form-urlencoded
 * @return {Example.model} 200
 */
router.post( '/form', exampleController.getBody );

/**
 * @route POST /swagger-example/json
 * @summary This route accepts json
 * @group Swagger example - swagger generator demo
 * @param {Example.model} data.body
 * @produces application/json
 * @consumes application/json
 * @return {Example.model} 200
 */
router.post( '/json', exampleController.getBody );

/**
 * @route GET /swagger-example/bad-request
 * @summary This route returns an error
 * @group Swagger example - swagger generator demo
 * @return {Error.model} 400 - Bad Request
 */
router.get( '/bad-request', exampleController.getError );

/**
 * @route GET /swagger-example/secured
 * @summary This route is secured with Authorization header
 * @group Swagger example - swagger generator demo
 * @return {string} 200 - JWT
 * @return {string} 401 - Unauthorized
 * @security JWT
 */
router.get( '/secured', exampleController.getAuthorization );

module.exports = router;
