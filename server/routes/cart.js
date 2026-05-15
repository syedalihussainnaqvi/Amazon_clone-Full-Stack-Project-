const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');

const router = express.Router();

// All cart routes are protected
router.use(authMiddleware);

// GET /api/cart/:userId
router.get('/:userId', getCart);

// POST /api/cart
router.post('/', addToCart);

// PUT /api/cart
router.put('/', updateCartItem);

// DELETE /api/cart (clear all)
router.delete('/', clearCart);

// DELETE /api/cart/:productId
router.delete('/:productId', removeFromCart);

module.exports = router;
