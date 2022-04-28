const { invoiceService } = require( "../services" );

const post = async ( req, res, next ) => {
	const { user_id, order_id, url } = req.body;
	next(  await invoiceService.post( user_id, order_id, url ).catch( next ) );
};

const get = async ( req, res, next ) => {
	const { user_id, order_id } = req.params;
	next( await invoiceService.get( user_id, order_id ).catch( next ) );
};

module.exports = {
	post,
	get
};
