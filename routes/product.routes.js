// routes/product.routes.js

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productUser.controller');

// Routes for managing products
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

module.exports = router;
