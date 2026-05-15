const Order = require('../models/Order');
const Cart = require('../models/Cart');

/**
 * Create a new order
 * POST /api/orders
 */
const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, subtotal, tax, shipping, totalPrice } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      userId: req.user.id,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      tax,
      shipping,
      totalPrice,
    });

    const createdOrder = await order.save();

    // Clear user's cart after successful order
    await Cart.findOneAndUpdate({ userId: req.user.id }, { items: [] });

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get user orders
 * GET /api/orders/myorders
 */
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createOrder, getMyOrders };
