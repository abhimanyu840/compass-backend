// payment.routes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

// Routes for creating a payment order, capturing payment, and handling webhooks
router.post('/checkout', paymentController.createOrder); //checkout 
router.post('/paymentVerification', paymentController.paymentVerification);


// checkout and paymentverification needed

module.exports = router;
