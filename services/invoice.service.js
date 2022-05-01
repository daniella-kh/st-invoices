const storageService = require( './storage.service' );

const post = async ( user_id, order_id, url ) => {
	const filename = user_id + '/' + order_id + '.pdf';
	return await storageService.uploadFromUrl( url, filename );
};

const get = async ( user_id, order_id ) => {
	const filename = user_id + '/' + order_id + '.pdf';
	return storageService.download( filename );
};

module.exports = {
	post,
	get
}
