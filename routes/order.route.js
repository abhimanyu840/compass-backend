// order.routes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

// Create order route
router.post('/create', orderController.createOrder);

// Route to get all orders
router.get('/', orderController.getAllOrders);

// Route to get a specific order by USER ID
router.get('/:id', orderController.getOrderByUserId);

// Route to get a specific order by ID
router.get('/orders/:id', orderController.getOrderById);

// Route to update an existing order
router.put('/orders/:id', orderController.updateOrder);

// Route to delete an existing order
router.delete('/orders/:id', orderController.deleteOrder);



// Fetch user orders route
// router.get('/user-orders', orderController.getUserOrders);

module.exports = router;
