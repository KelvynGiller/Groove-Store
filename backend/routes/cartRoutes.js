const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const verifyToken = require('../firebaseAdmin');

router.post('/create-or-get', verifyToken, cartController.createOrGetCart);
router.post('/', verifyToken, cartController.createCart);
router.post('/:cart_id/add-product', verifyToken, cartController.addProductToCart);
router.get('/:cart_id/items', verifyToken, cartController.getCartItems); 
router.put('/:cart_id/update-quantity', verifyToken, cartController.updateProductQuantity); 
router.delete('/:cart_id/remove-product', verifyToken, cartController.removeProductFromCart); 

module.exports = router;