const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create an order
 *     description: Creates a new order.
 *     responses:
 *       201:
 *         description: Order created successfully
 */

router.post('/', orderController.createOrder);

/**
 * @swagger
 * /orders/{user_id}:
 *   get:
 *     summary: Get orders by user ID
 *     description: Retrieves all orders for a specific user.
 *     responses:
 *       200:
 *         description: List of user orders
 */

router.get('/:user_id', orderController.getOrdersByUserId);

/**
 * @swagger
 * /orders/{orderId}:
 *   get:
 *     summary: Get order details
 *     description: Retrieves details of a specific order.
 *     responses:
 *       200:
 *         description: Order details retrieved successfully
 */

router.get('/:orderId', orderController.getOrderById);

/**
 * @swagger
 * /orders/{orderId}/status:
 *   put:
 *     summary: Update order status
 *     description: Updates the status of an existing order.
 *     responses:
 *       200:
 *         description: Order status updated successfully
 */

router.put('/:orderId/status', orderController.updateOrderStatus);

/**
 * @swagger
 * /orders/{orderId}:
 *   delete:
 *     summary: Delete an order
 *     description: Deletes a specific order.
 *     responses:
 *       200:
 *         description: Order deleted successfully
 */

router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;