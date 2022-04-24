### Express Swagger Generator

![swagger-example.png](swagger-example.png)

To generate the swagger doc from the picture above with traditional swagger `yaml` you will use the following syntax

```yaml
swagger: '2.0'
info:
  version: 1.0.0
  title: Based on "Basic Auth Example"
  description: >
    An example for how to use Auth with Swagger.

host: server.elementor.com
schemes:
  - http
  - https
securityDefinitions:
  Bearer:
    type: apiKey
    name: Authorization
    in: header
paths:
  /:
    get:
      security:
        - Bearer: [ ]
      responses:
        '200':
          description: 'Will send `Authenticated`'
        '403':
          description: 'You do not have necessary permissions for the resource'
```

with `express-swagger-generator` you will do this:

1. create an option object

```js
const options = {
	swaggerDefinition: {
		info: {
			description: 'An example for how to use Auth with Swagger.',
			title: 'Based on "Basic Auth Example"',
			version: '1.0.0',
		},
		host: 'server.elementor.com',
		schemes: [ 'http', 'https' ],
		securityDefinitions: {
			Bearer: {
				type: 'apiKey',
				in: 'header',
				name: 'Authorization',
			}
		}
	},
	basedir: __dirname,
	files: [ 'path/to/the/files/with/routes' ],
};
```

2. pass `express` app to `express-swagger-generator`

```js
const express = require( 'express' );
const app = express();
const expressSwagger = require( 'express-swagger-generator' )( app );
expressSwagger( options );
```

3. add `JSDoc to your routes`

```js
/**
 * @route GET /
 * @group default
 * @returns {string} 200 - Will send `Authenticated`
 * @returns {string} 403 - You do not have necessary permissions for the resource
 * @security Bearer
 */
app.get( '/', ( req, res ) => {

} );
```

### Describing Parameters

with the swagger `yaml` you will do this:

```yaml
paths:
  /users/{userId}:
    get:
      summary: Gets a user by ID.
      parameters:
        - in: path
          name: userId
          type: integer
          required: true
          description: Numeric ID of the user to get.
```

With `express-swagger-generator`use the `@param` tag like this

```js
/**
 * @route GET /users/{userId}
 * @param {integer} userId.path.required - Numeric ID of the user to get.
 */
app.get( '/users/:userId', ( req, res ) => {

} );
```

### Parameter Types

- **path** - parameterName.path
- **query** - queryParameterName.path
- **body** - bodyName.body
- **formData** - formFieldName.formData
- **header** - headerName.header

### Custom Types

To describe an object `Point` use the `@typedef` like this

```js
const Point = {
	x: 0,
	y: 1234,
	color: 'blue',
	status: 'available',
};
/**
 * @typedef Point
 * @property {integer} x.required
 * @property {integer} y.required - Some description for point - eg: 1234
 * @property {string} color
 * @property {enum} status - Status values that need to be considered for filter - eg: available,pending
 */
```

then you can use it do describe the type of `@param` or a `@return` tag:

```js
/**
 * @route GET /point
 * @summary Returns a Point
 * @returns {Point.model} 200
 */
app.get( '/point', ( req, res ) => {
	res.send( point );
} );
```

Tool for converting JSON to JSDoc [json-to-jsdoc](https://transform.tools/json-to-jsdoc) (⚠️ convert types to lower case
⚠️)

### More examples

1. [swagger-example.route.js](swagger-example.route.js)
2. [swagger-example.typedefs.js](swagger-example.typedefs.js)
3. [express-swagger-generator](https://github.com/pgroot/express-swagger-generator)
