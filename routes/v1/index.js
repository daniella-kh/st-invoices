const express = require( 'express' );
const router = express.Router();
const invoiceRouter = require( './invoice/invoice.route.js' );

router.use( '/invoice', invoiceRouter );

module.exports = router;
