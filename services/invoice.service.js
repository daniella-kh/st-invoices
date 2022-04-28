const storageService = require( './storage-service' );

const post = async ( user_id, order_id, url ) => {
	const filename = user_id + '/' + order_id + '.pdf';

	await storageService.uploadFromUrl( url, filename );

	return storageService.download( filename );
};

const get = async ( user_id, order_id ) => {
	return storageService.download( user_id + '/' + order_id + '.pdf' );
};

module.exports = {
	post,
	get
}
