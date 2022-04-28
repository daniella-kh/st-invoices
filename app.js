const express = require( 'express' );
const cookieParser = require( 'cookie-parser' );
const helmet = require( 'helmet' );
const createError = require( 'http-errors' );
const { loggerMiddleware } = require( './utils/logger' );
const errorHandler = require( './middlewares/middleware-error-handler' );
const sentry = require( './utils/sentry' );
const indexRouter = require( './routes/index' );
const swaggerGenerator = require( './swagger-generator' );
const config = require( './config' );

const app = express();

swaggerGenerator( app );

// The request handler must be the first middleware on the app
app.use( sentry.Handlers.requestHandler() );
app.use( helmet() );
app.use( loggerMiddleware );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( cookieParser() );
//app.use( ipClient );

app.use( indexRouter );

// catch 404 and forward to error handler
app.use( ( req, res, next ) => {
	next( createError( 404 ) );
} );

// The error handler must be before any other error middleware and after all controllers
app.use( sentry.Handlers.errorHandler() );

// error handler
app.use( errorHandler );

module.exports = app;
