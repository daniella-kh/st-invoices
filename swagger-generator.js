const expressSwaggerGenerator = require( 'express-swagger-generator' );
const { app, swagger } = require( './config' );

const options = {
	swaggerDefinition: {
		info: {
			description: 'Service for saving and retrieving invoices.',
			title: 'Invoice Service',
			version: '1.0.0',
		},
		basePath: app.baseRoute,
		schemes: [ 'http', 'https' ],
		securityDefinitions: {
			JWT: {
				type: 'apiKey',
				in: 'header',
				name: 'Authorization',
				description: '',
			},
		},
	},
	basedir: __dirname, //app absolute path
	files: [ '**/*.route.js', '**/*.typedefs.js' ], //Path to the API handle folder
	route: {
		url: swagger.swaggerURL,
		docs: `${ swagger.swaggerURL }.json`,
	},
};

const swaggerGenerator = ( expressApp ) => {
	expressSwaggerGenerator( expressApp )( options );
};

module.exports = swaggerGenerator;
