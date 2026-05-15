const express = require('express');
const { body } = require('express-validator');
const { register, login, getMe, forgotPassword } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/register
router.post(
  '/register',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  register
);

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').exists().withMessage('Password is required'),
  ],
  login
);

// GET /api/auth/me (protected)
router.get('/me', authMiddleware, getMe);

// POST /api/auth/wishlist (protected)
router.post('/wishlist', authMiddleware, require('../controllers/authController').toggleWishlist);

// POST /api/auth/forgot-password
router.post('/forgot-password', forgotPassword);

module.exports = router;
