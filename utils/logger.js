const config = require( '../config' );

const logger = require( 'pino' )( {
	enabled: ! config.app.silent,
	level: config.app.logLevel,
} );

/* istanbul ignore next */
const serializerReq = ( req ) => ( {
	method: req.method,
	url: req.url,
	referer: req.headers.referer,
	user_agent: req.headers[ 'user-agent' ],
	cf_ipcountry: req.headers[ 'cf-ipcountry' ],
	cf_ray: req.headers[ 'cf-ray' ],
	true_client_ip: req.clientIP,
	query_string: ( new URLSearchParams( req.query ) ).toString()
} );

/* istanbul ignore next */
const serializerRes = ( res ) => ( {
	response_size: res.headers[ 'content-length' ],
	status: res.statusCode,
} );

const loggerMiddleware = require( 'express-pino-logger' )( {
	logger, serializers: {
		req: serializerReq,
		res: serializerRes,
	},
	customAttributeKeys: {
		responseTime: 'time_to_serve',
	},
	customProps: () => ( { stream: 'ba' } ),
} );

module.exports = { logger, loggerMiddleware };
