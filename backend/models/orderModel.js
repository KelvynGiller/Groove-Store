const pool = require('../config/db');

const Order = {
 checkCartExists: async (cart_id) => {
  const result = await pool.query(
    'SELECT id FROM carts WHERE id = $1',
    [cart_id]
  );
  return result.rows[0];
},

createOrder: async (cart_id, user_id, total_price) => {
  const result = await pool.query(
    'INSERT INTO orders (cart_id, user_id, total_price) VALUES ($1, $2, $3) RETURNING *',
    [cart_id, user_id, total_price]
  );
  return result.rows[0];
},

  getById: async (order_id) => {
    const result = await pool.query(
      'SELECT * FROM orders WHERE id = $1',
      [order_id]
    );
    return result.rows[0];
  },

  updateStatus: async (order_id, status) => {
    const result = await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, order_id]
    );
    return result.rows[0];
  },

  getAllByUserId: async (user_id) => {
    const result = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1',
      [user_id]
    );
    return result.rows;
  },

  deleteOrder: async (order_id) => {
    const result = await pool.query(
      'DELETE FROM orders WHERE id = $1 RETURNING *',
      [order_id]
    );
    return result.rows[0];
  },

  createPayment: async (order_id, payment_intent_id) => {
    const result = await pool.query(
      'UPDATE orders SET payment_intent_id = $1, status = $2 WHERE id = $3 RETURNING *',
      [payment_intent_id, 'paid', order_id]
    );
    return result.rows[0];
  }
};

module.exports = Order;