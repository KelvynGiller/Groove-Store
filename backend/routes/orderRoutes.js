const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyToken = require('../firebaseAdmin');

router.post('/:orderId/items', verifyToken, orderController.addOrderItems);
router.post('/', verifyToken, orderController.createOrder);
router.get('/:user_id', verifyToken, orderController.getOrdersByUserId);
router.get('/details/:orderId', verifyToken, orderController.getOrderById);
router.put('/:orderId/status', verifyToken, orderController.updateOrderStatus);
router.delete('/:orderId', verifyToken, orderController.deleteOrder);
router.post('/create-payment-intent', verifyToken, orderController.createPaymentIntent);

module.exports = router;