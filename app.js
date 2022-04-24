const express = require( 'express' );
const cookieParser = require( 'cookie-parser' );
const helmet = require( 'helmet' );
const createError = require( 'http-errors' );
const rookout = require( 'rookout' );
const ipClient = require( '@elementor/elementor-client-ip' );
const { loggerMiddleware } = require( './utils/logger' );
const errorHandler = require( './middlewares/middleware-error-handler' );
const metrics = require( './middlewares/middleware-metrics' );
const sentry = require( './utils/sentry' );
const indexRouter = require( './routes/index' );
const swaggerGenerator = require( './swagger-generator' );
const config = require( './config' );

const app = express();

//Connect to mongodb if mongo env are defined
if ( process.env.MONGO_URL || process.env.MONGO_HOST ) {
	require( './db/mongo' ).connect();
}

swaggerGenerator( app );

// Express Prometheus client middleware
app.use( metrics );

// The request handler must be the first middleware on the app
app.use( sentry.Handlers.requestHandler() );
app.use( helmet() );
app.use( loggerMiddleware );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( ipClient );

app.use( indexRouter );

// catch 404 and forward to error handler
app.use( ( req, res, next ) => {
	next( createError( 404 ) );
} );

// The error handler must be before any other error middleware and after all controllers
app.use( sentry.Handlers.errorHandler() );

// error handler
app.use( errorHandler );

rookout.start( {
	token: config.rookOut.rookOutKey,
	labels: {
		"env": config.app.shortEnv // Optional,see Labels page below Projects
	}
} );

module.exports = app;
