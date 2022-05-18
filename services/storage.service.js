const { storage } = require( '../services/google.services' );
const config = require( '../config' );
const axios = require( "axios" );

const storageService = () => {
	const bucketName = config.storage.bucket_name;

	const upload = async ( filepath, destination ) => {
		await storage.bucket( bucketName ).upload( filepath, { destination } );
	}

	const uploadFromUrl = async ( from, to ) => {
		const bucket = storage.bucket( config.storage.bucket_name );
		const file = bucket.file( to );
		const writeStream = file.createWriteStream();
		const stream = await axios( from, { method: 'GET', responseType: 'stream' } );
		return await stream.data.pipe( writeStream );
	}

	const download = async ( filename ) => {
		let url = null;

		const file = await storage.bucket( bucketName ).file( filename );
		const [ exists ] = await file.exists();
		if ( exists ) {
			[ url ] = await file.getSignedUrl( getOptions() );
		}

		return url;
	}

	/*	
	const deleteAll = async ( prefix ) => {

		// Lists files in the bucket, filtered by a prefix
		const [ files ] = await storage.bucket( bucketName ).getFiles( { prefix } );

		if ( !files.length ) {
			return {};
		}

		files.forEach( file => {
			storage.bucket( bucketName ).file( file.name ).delete();
		} );

		return download( files[ 0 ].name );
	}
	*/

	const getOptions = () => {
		return {
			version: 'v4',
			action: 'read',
			expires: Date.now() + config.storage.expiration,
		};
	}

	return {
		upload,
		uploadFromUrl,
		download
	}
}
module.exports = storageService();
