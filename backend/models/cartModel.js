const pool = require('../config/db');

const Cart = {
    
    createCart: async (user_id) => {
        const result = await pool.query(
            'INSERT INTO carts (user_id) VALUES ($1) RETURNING *',
            [user_id]
        );
        return result.rows[0];
    },

    findById: async (cart_id) => {
        const result = await pool.query(
            'SELECT * FROM carts WHERE id = $1',
            [cart_id]
        );
        return result.rows[0];
    },
    
    addProduct: async (cart_id, product_id, quantity, price) => {
        
        const result = await pool.query(
            'INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
            [cart_id, product_id, quantity, price]
        );
        return result.rows[0];
    },

    updateProductQuantity: async (cart_id, product_id, quantity) => {
        const result = await pool.query(
            'UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *',
            [quantity, cart_id, product_id]
        );
        return result.rows[0];
    },

    removeProduct: async (cart_id, product_id) => {
        const result = await pool.query(
            'DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2 RETURNING *',
            [cart_id, product_id]
        );
        return result.rows[0];
    },

    getProductPrice: async (product_id) => {
        const result = await pool.query(
            'SELECT price FROM products WHERE id = $1',
            [product_id]
        );
    
        if (result.rows.length === 0) {
            throw new Error('Product not found');
        }
    
        return result.rows[0].price;
    },

    getItems: async (cart_id) => {
        const result = await pool.query(
            'SELECT ci.product_id, ci.quantity, p.name, p.price ' +
            'FROM cart_items ci ' +
            'JOIN products p ON ci.product_id = p.id ' +
            'WHERE ci.cart_id = $1', 
            [cart_id]
        );

        return result.rows;
    },
};

module.exports = Cart;