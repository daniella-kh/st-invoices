const express = require( 'express' );
const router = express.Router();
const { healthcheckService } = require( '../../services' );
const { logger } = require( "../../utils/logger" );
const { logLevelValidationRules } = require( "./loglevel.validation" );

router.get( '/readiness', ( req, res ) => {
	res.send( { status: 'success' } );
} );

router.get( '/liveness', async ( req, res ) => {

	const status = await healthcheckService();
	if ( status.ready ) {
		res.json( status );
	} else {
		res.status( 500 ).json( status );
	}

} );

router.get( '/loglevel', async ( req, res ) => {
	return res.send( { level: logger.level } );
} );

router.put( '/loglevel', logLevelValidationRules, async ( req, res ) => {
	logger.level = req.body.level;
	return res.send( { level: logger.level } );
} );

module.exports = router;
