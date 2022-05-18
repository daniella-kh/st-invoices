const { invoiceService } = require( "../services" );
const https = require( "https" );

const post = async ( req, res, next ) => {
	const { user_id, order_id } = req.params;
	const { url } = req.body;
	next( await invoiceService.post( user_id, order_id, url ).catch( next ) );
};

const get = async ( req, res, next ) => {
	const user_id = req.elementorUser.userID;

	const { order_id } = req.params;
	const path = await invoiceService.get( user_id, order_id );

	if ( path ) {
		const externalReq = https.request( path, function( externalRes ) {
			res.setHeader( "Content-Type", "application/pdf" );
			externalRes.pipe( res );
		} );
		externalReq.end();
	} else {
		res.redirect( process.env.INVOICES_REDIRECT_URL + order_id );
	}
};

module.exports = {
	post,
	get
};
