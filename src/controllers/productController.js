const Product = require('../models/productModel');

class ProductController {
    // Get all products
    static async getProducts(req, res) {
        try {
            const products = await Product.findAll();
            res.status(200).json({
                status: 'success',
                data: products,
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve products',
                error: error.message,
            });
        }
    }

    // Get single product
    static async getProduct(req, res) {
        try {
            const productId = parseInt(req.params.id);
            if (isNaN(productId)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid product ID',
                });
            }

            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Product not found',
                });
            }

            res.status(200).json({
                status: 'success',
                data: product,
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve product',
                error: error.message,
            });
        }
    }

    // Create product
    static async createProduct(req, res) {
        try {
            const { name, price, stock } = req.body;

            // Validasi input
            if (!name || !price || !stock) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Name, price, and stock fields are required',
                });
            }

            const newProductId = await Product.create({ name, price, stock });
            res.status(201).json({
                status: 'success',
                message: 'Product created successfully',
                data: { id: newProductId },
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to create product',
                error: error.message,
            });
        }
    }

    // Update product
    static async updateProduct(req, res) {
        try {
            const productId = parseInt(req.params.id);
            const { name, price, stock } = req.body;

            if (isNaN(productId)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid product ID',
                });
            }

            const updated = await Product.update(productId, { name, price, stock });
            if (!updated) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Product not found',
                });
            }

            res.status(200).json({
                status: 'success',
                message: 'Product updated successfully',
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to update product',
                error: error.message,
            });
        }
    }

    // Delete product
    static async deleteProduct(req, res) {
        try {
            const productId = parseInt(req.params.id);
            if (isNaN(productId)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Invalid product ID',
                });
            }

            const deleted = await Product.delete(productId);
            if (!deleted) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Product not found',
                });
            }

            res.status(200).json({
                status: 'success',
                message: 'Product deleted successfully',
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to delete product',
                error: error.message,
            });
        }
    }
}

module.exports = ProductController;
