const pool = require('../config/db');

const Order = {
  checkCartExists: async (cart_id) => {
    const result = await pool.query(
      'SELECT id FROM carts WHERE id = $1',
      [cart_id]
    );
    return result.rows[0];
  },

  getOrderItems: async (orderId) => {
    try {
      const query = `
        SELECT 
          oi.id, 
          oi.order_id, 
          oi.product_id, 
          oi.quantity, 
          oi.price,
          p.name AS name,
          p.artist,
          p.category AS genre
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = $1;
      `;
      const { rows } = await pool.query(query, [orderId]);
      return rows;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  createOrder: async (cart_id, user_id, total_price) => {
    const result = await pool.query(
      'INSERT INTO orders (cart_id, user_id, total_price) VALUES ($1, $2, $3) RETURNING *',
      [cart_id, user_id, total_price]
    );
    return result.rows[0];
  },

  getById: async (order_id) => {
    const orderResult = await pool.query(
      'SELECT * FROM orders WHERE id = $1',
      [order_id]
    );
    const order = orderResult.rows[0];
    
    if (!order) return null;
    
    const items = await Order.getOrderItems(order_id);
    
    order.items = items.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
      name: item.product_name,
      artist: item.artist,
      genre: item.category
    }));
    
    order.totalAmount = order.items.reduce((sum, item) => {
      return sum + parseFloat(item.price) * item.quantity;
    }, 0);
    
    return order;
  },

  updateStatus: async (order_id, status) => {
    const result = await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, order_id]
    );
    return result.rows[0];
  },

  addOrderItems: async (order_id, items) => {
    if (!items || items.length === 0) {
      throw new Error("No items to add.");
    }
  
    const insertedItems = [];
  
    for (const item of items) {
      const result = await pool.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [order_id, item.productId, item.quantity, item.price]
      );
      insertedItems.push(result.rows[0]);
    }
  
    if (insertedItems.length === 0) {
      throw new Error("Error");
    }
  
    return insertedItems;
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