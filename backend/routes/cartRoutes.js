const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Create a new cart
 *     description: Creates a new shopping cart.
 *     responses:
 *       201:
 *         description: Cart created successfully
 */

router.post('/', cartController.createCart);

/**
 * @swagger
 * /cart/{cart_id}:
 *   post:
 *     summary: Add product to cart
 *     description: Adds a product to the cart by cart ID.
 *     parameters:
 *       - in: path
 *         name: cart_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product added to cart
 */

router.post('/:cart_id', cartController.addProductToCart);

/**
 * @swagger
 * /cart/{cart_id}:
 *   get:
 *     summary: Get cart items
 *     description: Retrieves all items from the cart.
 *     responses:
 *       200:
 *         description: List of cart items
 */

router.get('/:cart_id', cartController.getCartItems);

/**
 * @swagger
 * /cart/{cart_id}:
 *   put:
 *     summary: Update product quantity
 *     description: Updates the quantity of a product in the cart.
 *     responses:
 *       200:
 *         description: Product quantity updated
 */

router.put('/:cart_id', cartController.updateProductQuantity);

/**
 * @swagger
 * /cart/{cart_id}/product:
 *   delete:
 *     summary: Remove product from cart
 *     description: Removes a product from the cart.
 *     responses:
 *       200:
 *         description: Product removed from cart
 */

router.delete('/:cart_id/product', cartController.removeProductFromCart);

/**
 * @swagger
 * /cart/{cart_id}/checkout:
 *   post:
 *     summary: Checkout
 *     description: Completes the purchase and creates an order.
 *     responses:
 *       201:
 *         description: Checkout successful
 */
router.post('/:cart_id/checkout', orderController.checkout);

module.exports = router;