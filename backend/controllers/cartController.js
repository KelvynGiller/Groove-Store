const Cart = require('../models/cartModel');

const createCart = async (req, res) => {
    const { user_id } = req.body;

    try {
        const carts = await Cart.createCart(user_id);
        res.status(201).json({
            message: 'Cart created successfully',
            carts: carts,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating cart', error: error.message });
    }
};
const addProductToCart = async (req, res) => {
    const { cart_id } = req.params;
    const { product_id, quantity } = req.body;

    try {
        const cart = await Cart.findById(cart_id);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const price = await Cart.getProductPrice(product_id);

        const newProduct = await Cart.addProduct(cart_id, product_id, quantity, price);

        res.status(201).json({
            message: 'Product added to cart',
            product: newProduct,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product to cart', error: error.message });
    }
};

const getCartItems = async (req, res) => {
    const { cart_id } = req.params;

    try {
        const cart = await Cart.findById(cart_id);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const items = await Cart.getItems(cart_id);
        res.json({ items });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart items', error: error.message });
    }
};

const updateProductQuantity = async (req, res) => {
    const { cart_id } = req.params;
    const { product_id, quantity } = req.body;

    try {
        const cart = await Cart.findById(cart_id);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const updatedProduct = await Cart.updateProductQuantity(cart_id, product_id, quantity);
        res.json({
            message: 'Product quantity updated',
            product: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product quantity', error });
    }
};

const removeProductFromCart = async (req, res) => {
    const { cart_id } = req.params;
    const { product_id } = req.body;

    try {
        const cart = await Cart.findById(cart_id);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const removedProduct = await Cart.removeProduct(cart_id, product_id);
        res.json({
            message: 'Product removed from cart',
            product: removedProduct,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error removing product from cart', error });
    }
};

module.exports = {
    createCart,
    addProductToCart,
    getCartItems,
    updateProductQuantity,
    removeProductFromCart,
};