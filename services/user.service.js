const { redis } = require( '../db' );
const { sqlDb } = require( '../db' ).sql;
const mongoose = require( 'mongoose' );

const schema = new mongoose.Schema( { username: 'string', email: 'string', password: 'string' } );
const User = mongoose.model( 'User', schema );

const getUserFromRedis = async ( email ) => {
	return await redis.getAsync( email )
}

const getUserFromSql = async ( email ) => {
	let user = await getUserFromRedis( email );
	if ( user ) {
		return user;
	}

	user = await sqlDb( 'users' ).select().where( { email } ).first();
	if ( !user ) {
		return;
	}

	saveInRedis( user ).then();
	return user;
}

const getUserFromMongo = async ( email ) => {
	return User.findOne( { email } )
}

const saveInRedis = async ( user ) => {
	return await redis.setAsync( user.email, user );
}

const saveInMongo = async ( user ) => {
	const userToSave = new User( user );
	return await userToSave.save();
}

const saveInSql = async ( user ) => {

	return await sqlDb( 'users' )
		.where( { email: user.email } )
		.update( user )
		.catch( () => undefined )
			|| await sqlDb( 'users' )
				.insert( user )
				.catch( console.error )
}

module.exports = {
	getUserFromRedis,
	getUserFromSql,
	getUserFromMongo,
	saveInRedis,
	saveInMongo,
	saveInSql,
	User
}
