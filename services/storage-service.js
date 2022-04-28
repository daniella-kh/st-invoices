const { storage } = require( '../services/google-services' );
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
		await stream.data.pipe( writeStream );
	}

	const download = async ( filename ) => {
		let url = null;
		const options = {
			version: 'v4',
			action: 'read',
			expires: Date.now() + config.storage.expiration,
		};

		const file = await storage.bucket( bucketName ).file( filename );
		const [ exists ] = await file.exists();
		if ( exists ) {
			[ url ] = await storage.bucket( bucketName ).file( filename ).getSignedUrl( options );
		}

		return url;
	}

	const downloadFirst = async ( prefix ) => {
		const options = {
			prefix,
		};

		// Lists files in the bucket, filtered by a prefix
		const [ files ] = await storage.bucket( bucketName ).getFiles( options );

		if ( !files.length ) {
			return {};
		}

		return download( files[ 0 ].name );
	}

	const isLive = async () => {
		let result = true;
		try {
			await storage.bucket( bucketName ).getMetadata();
		} catch ( err ) {
			result = { err: err.message };
		}
		return result;
	}

	const deleteAll = async ( prefix ) => {
		const options = {
			prefix,
		};

		// Lists files in the bucket, filtered by a prefix
		const [ files ] = await storage.bucket( bucketName ).getFiles( options );

		if ( !files.length ) {
			return {};
		}

		files.forEach( file => {
			storage.bucket( bucketName ).file( file.name ).delete();
		} );

		return download( files[ 0 ].name );
	}

	return {
		upload,
		uploadFromUrl,
		download,
		downloadFirst,
		isLive,
		deleteAll
	}
}
module.exports = storageService();
