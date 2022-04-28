const express = require( 'express' );
const router = express.Router();
const { app } = require( '../config' );

const statusRouter = require( './common/status.route' ); //todo: what is this?

const v1_Router = require( './v1' );

//Common routes
router.use( statusRouter );

//v1 routes
router.use( app.baseRoute, v1_Router );

router.use( ( result, req, res, next ) => {
	if ( result instanceof Error ) {
		return next( result );
	}
	res.json( result );
} );

module.exports = router;
