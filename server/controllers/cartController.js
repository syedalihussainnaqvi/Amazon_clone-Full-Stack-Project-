const Cart = require('../models/Cart');

/**
 * Get user's cart
 * GET /api/cart/:userId
 */
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    if (!cart) {
      cart = { userId: req.user.id, items: [] };
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Add item to cart
 * POST /api/cart
 */
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, size = 'M', color = 'Black' } = req.body;

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({
        userId: req.user.id,
        items: [{ productId, quantity, size, color }],
      });
    } else {
      // Check if item already exists in cart
      const existingItem = cart.items.find(
        (item) =>
          item.productId.toString() === productId &&
          item.size === size &&
          item.color === color
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity, size, color });
      }
    }

    await cart.save();
    cart = await Cart.findById(cart._id).populate('items.productId');
    res.json(cart);
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Update cart item quantity
 * PUT /api/cart
 */
const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity, size, color } = req.body;

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(
      (item) =>
        item.productId.toString() === productId &&
        item.size === (size || item.size) &&
        item.color === (color || item.color)
    );

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (i) => i.productId.toString() !== productId || i.size !== item.size || i.color !== item.color
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    cart = await Cart.findById(cart._id).populate('items.productId');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Remove item from cart
 * DELETE /api/cart/:productId
 */
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { size, color } = req.query;

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      (item) => {
        if (item.productId.toString() !== productId) return true;
        if (size && item.size !== size) return true;
        if (color && item.color !== color) return true;
        return false;
      }
    );

    await cart.save();
    cart = await Cart.findById(cart._id).populate('items.productId');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Clear entire cart
 * DELETE /api/cart
 */
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ message: 'Cart cleared', items: [] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
