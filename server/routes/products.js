const express = require('express');
const { getProducts, getProductById, getCategories, createProduct } = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

const router = express.Router();

// GET /api/products/categories/list — must be before :id route
router.get('/categories/list', getCategories);

// GET /api/products
router.get('/', getProducts);

// POST /api/products (Admin only)
router.post('/', authMiddleware, adminMiddleware, createProduct);

// GET /api/products/:id
router.get('/:id', getProductById);

module.exports = router;
