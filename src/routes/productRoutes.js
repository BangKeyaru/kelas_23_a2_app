// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

// Routes
router.get('/products', ProductController.getProducts);
router.get('/products/:id', ProductController.getProduct);
router.post('/products', ProductController.createProduct);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

module.exports = router;