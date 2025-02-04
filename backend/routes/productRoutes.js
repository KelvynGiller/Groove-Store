const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Retrieves all products from the store.
 *     responses:
 *       200:
 *         description: List of all products
 */

router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     description: Retrieves a specific product by ID.
 *     responses:
 *       200:
 *         description: Product details retrieved
 */

router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /products/category/{category}:
 *   get:
 *     summary: Get products by category
 *     description: Retrieves products by category.
 *     responses:
 *       200:
 *         description: List of products in the specified category
 */
router.get('/category/:category', productController.getProductsByCategory);

module.exports = router;