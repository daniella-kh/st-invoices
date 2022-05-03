const storageService = require( './storage.service' );

const post = async ( user_id, order_id, url ) => {
	return await storageService.uploadFromUrl( url, getFileName( user_id, order_id ) );
};

const get = async ( user_id, order_id ) => {
	return storageService.download( getFileName( user_id, order_id ) );
};

const getFileName = ( user_id, order_id ) => {
	return user_id + '/' + order_id + '.pdf';
}

module.exports = {
	post,
	get,
	getFileName
}
