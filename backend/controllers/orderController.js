const Stripe = require("stripe");
const dotenv = require("dotenv");
const Order = require("../models/orderModel");
const db = require("../config/db");

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createOrder = async (req, res) => {
  const { cart_id, user_id, total_price } = req.body;
  console.log("Data Received:", { cart_id, user_id, total_price }); 

  try {
    if (!cart_id || !user_id || !total_price) {
      return res.status(400).json({ error: "cart_id, user_id, total_price are mandatory" });
    }

  
    const cartExists = await Order.checkCartExists(cart_id);
    console.log("Cart exists:", cartExists); 

    if (!cartExists) {
      return res.status(404).json({ error: "Cart not found" });
    }

    
    const newOrder = await Order.createOrder(cart_id, user_id, total_price);
    console.log("New order:", newOrder); 
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error:", error); 
    res.status(500).json({ error: "Error" });
  }
};

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency, order_id } = req.body;

    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

   
    await Order.createPayment(order_id, paymentIntent.id);

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrdersByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    
    const orders = await Order.getAllByUserId(user_id);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    
    const order = await Order.getById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

  
    const updatedOrder = await Order.updateStatus(orderId, status);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    
    const deletedOrder = await Order.deleteOrder(orderId);
    res.status(200).json(deletedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};