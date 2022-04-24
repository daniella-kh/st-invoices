const express = require( 'express' );
const router = express.Router();
const userRouter = require( './users/users.route.js' );
const swaggerExampleRouter = require( './swagger-example/swagger-example.route' );

router.use( '/user', userRouter );
router.use( '/swagger-example', swaggerExampleRouter );

module.exports = router;
