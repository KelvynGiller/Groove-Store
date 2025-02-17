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
          p.name AS product_name,
          p.artist,
          p.category AS genre
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = $1;
      `;
      const { rows } = await pool.query(query, [orderId]);
      return rows;
    } catch (error) {
      console.error("Error in getOrderItems:", error);
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
      id: item.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
      product_name: item.product_name,
      artist: item.artist,
      genre: item.genre
    }));
    
    // Calcula o total se desejar (opcional)
    order.totalAmount = order.items.reduce((sum, item) => {
      return sum + parseFloat(item.price) * item.quantity;
    }, 0);
    
    return order;
  },

  getAllByUserId: async (user_id) => {
    try {
      const query = `
        SELECT 
          o.id, 
          o.user_id, 
          o.total_price, 
          o.order_date, 
          o.cart_id, 
          o.status, 
          o.payment_intent_id,
          oi.id AS order_item_id,
          oi.product_id,
          oi.quantity,
          oi.price AS item_price,
          p.name AS product_name,
          p.artist,
          p.category AS genre
        FROM orders o 
        LEFT JOIN order_items oi ON o.id = oi.order_id 
        LEFT JOIN products p ON oi.product_id = p.id 
        WHERE o.user_id = $1
        ORDER BY o.order_date DESC;
      `;
      const { rows } = await pool.query(query, [user_id]);

      const ordersMap = {};
      rows.forEach(row => {
        if (!ordersMap[row.id]) {
          ordersMap[row.id] = {
            id: row.id,
            user_id: row.user_id,
            total_price: row.total_price,
            order_date: row.order_date,
            cart_id: row.cart_id,
            status: row.status,
            payment_intent_id: row.payment_intent_id,
            items: []
          };
        }
        if (row.order_item_id) {
          ordersMap[row.id].items.push({
            id: row.order_item_id,
            product_id: row.product_id,
            quantity: row.quantity,
            price: row.item_price,
            product_name: row.product_name,
            artist: row.artist,
            genre: row.genre
          });
        }
      });
      return Object.values(ordersMap);
    } catch (error) {
      console.error("Error in getAllByUserId:", error);
      throw error;
    }
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
      throw new Error("Error inserting items");
    }
  
    return insertedItems;
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