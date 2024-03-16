// Define routes for admin panel/dashboard
const express = require('express');
const router = express.Router();

// Import controllers for managing products, sales, and orders
const productController = require('../controllers/product.controller');
const salesController = require('../controllers/sales.controller');
const orderController = require('../controllers/order.controller');

// Middleware for admin authentication
// const authenticateAdmin = require('../middleware/adminAuth.mw');
const { verifyToken, isAdmin } = require("../middleware/auth.mw")

// Routes for managing digital products
router.post('/products/add', [verifyToken, isAdmin], productController.addProduct);
router.get('/products/:id', [verifyToken, isAdmin], productController.getProduct);
router.put('/products/update/:id', [verifyToken, isAdmin], productController.updateProduct);
router.delete('/products/delete/:id', [verifyToken, isAdmin], productController.deleteProduct);

// Endpoints for fetching sales data
router.get('/sales/daily', [verifyToken, isAdmin], salesController.getDailySales);
router.get('/sales/weekly', [verifyToken, isAdmin], salesController.getWeeklySales);
router.get('/sales/monthly', [verifyToken, isAdmin], salesController.getMonthlySales);
router.get('/sales/custom', [verifyToken, isAdmin], salesController.getCustomSales);

// Endpoints for managing orders
router.get('/orders', [verifyToken, isAdmin], orderController.getAllOrders);
router.get('/orders/:id', [verifyToken, isAdmin], orderController.getOrder);
router.put('/orders/:id/update', [verifyToken, isAdmin], orderController.updateOrder);
router.delete('/orders/:id/delete', [verifyToken, isAdmin], orderController.deleteOrder);

module.exports = router;
