/* istanbul ignore file */
const mongoose = require( 'mongoose' );
const { mongo } = require( '../config' );
const { logger } = require( '../utils/logger' );

let dbUrl = `mongodb+srv://${ mongo.user }:${ mongo.password }@${ mongo.host }/${ mongo.dbName }?retryWrites=true&w=majority`;

if ( mongo.url ) {
	dbUrl = mongo.url;
}

const db = {
	connect: () => {

		mongoose.set( 'useNewUrlParser', true );
		mongoose.set( 'useUnifiedTopology', true );
		mongoose.connect( dbUrl );

		mongoose.connection.on( 'error', err => {
			logger.info( `MongoDB connection failed: ${ dbUrl }` );
			logger.error( err );
		} );

		mongoose.connection.on( 'connected', () => logger.info( `connected to MongoDB ${ mongoose.connection.name }` ) );
		mongoose.connection.on( 'disconnected', () => logger.info( 'MongoDB disconnected' ) )
	},

	isMongoConnected: () => {
		const readyState = mongoose.connection.readyState;
		//mongo connection is connected if readyState is 1
		return readyState === 1;
	},

	close: () => {
		mongoose.connection.close();
	},

};

module.exports = db;
