// payment.controller.js
const Razorpay = require('razorpay');
const Payment = require('../models/payment.model');
const { KEY_ID, KEY_SECRET } = require('../configs/razorpay.config')
const crypto = require('crypto');
const { FRONTEND_HOST } = require('../configs/frontend.config')

// Initialize Razorpay with your API key and secret
const razorpay = new Razorpay({
    key_id: KEY_ID,
    key_secret: KEY_SECRET
});

// Controller function to create a payment order
exports.createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        // Create a payment order
        const options = {
            amount: amount * 100,  // Amount in paise
            currency: 'INR',
            // receipt: 'receipt_order_1',  // Unique order ID
            // payment_capture: 1  // Auto-capture payment
        };
        const order = await razorpay.orders.create(options);



        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error('Error creating payment order:', error);
        res.status(500).json({ error: error.message });
    }
};

// Controller function to capture payment
exports.paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
        // Database comes here

        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        });

        // res.redirect(
        //     `${FRONTEND_HOST}/paymentsuccess?reference=${razorpay_payment_id}`
        // );

    } else {
        res.status(400).json({
            success: false,
        });
    }
};
