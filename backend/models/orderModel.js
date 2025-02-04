const pool = require('../config/db');

const Order = {
  
  createOrder: async (cart_id, user_id, total_price) => {
    const result = await pool.query(
      'INSERT INTO orders (cart_id, user_id, total_price, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [cart_id, user_id, total_price, 'pending']
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
  }
};

module.exports = Order;