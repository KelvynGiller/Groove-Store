const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');

const checkout = async (req, res) => {
  const { cart_id } = req.params;
  const { user_id, paymentDetails } = req.body;
  
  try {
    const cart = await Cart.findById(cart_id);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const items = await Cart.getItems(cart_id);
    if (items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const paymentSuccess = processPayment(paymentDetails);
    if (!paymentSuccess) {
      return res.status(500).json({ message: 'Payment processing failed' });
    }

    let total_price = 0;
    for (let item of items) {
      const price = await Cart.getProductPrice(item.product_id);
      total_price += price * item.quantity;
    }

    const order = await Order.createOrder(cart_id, user_id, total_price);

    res.status(201).json({
      message: 'Checkout successful',
      order,
    });

  } catch (error) {
    res.status(500).json({ message: 'Error during checkout', error: error.message });
  }
};

const createOrder = async (req, res) => {
    const { cart_id, user_id, total_price } = req.body;
  
    try {
      const order = await Order.createOrder(cart_id, user_id, total_price);
      res.status(201).json({
        message: 'Order created successfully',
        order,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating order', error: error.message });
    }
  };

const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.getById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving order', error: error.message });
  }
};

const getOrdersByUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    const orders = await Order.getAllByUserId(user_id);
    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving orders', error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.updateStatus(orderId, status);
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order status updated successfully',
      updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await Order.deleteOrder(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order deleted successfully',
      deletedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
};

const processPayment = (paymentDetails) => {
  return true;
};

module.exports = {
  checkout,
  createOrder,
  getOrderById,
  getOrdersByUserId,
  updateOrderStatus,
  deleteOrder,
};