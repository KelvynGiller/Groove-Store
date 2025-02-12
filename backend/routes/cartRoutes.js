const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');

router.post('/create-or-get', cartController.createOrGetCart);
router.post('/', cartController.createCart);
router.post('/:cart_id/add-product', cartController.addProductToCart);
router.get('/:cart_id/items', cartController.getCartItems);
router.put('/:cart_id/update-quantity', cartController.updateProductQuantity);
router.delete('/:cart_id/remove-product', cartController.removeProductFromCart);

module.exports = router;