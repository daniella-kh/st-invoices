const express = require( 'express' );
const router = express.Router();
const invoicesRouter = require( './invoices/invoices.route.js' );

router.use( '/invoices', invoicesRouter );

module.exports = router;
