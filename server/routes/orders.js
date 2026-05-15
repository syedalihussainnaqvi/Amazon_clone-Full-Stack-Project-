const express = require('express');
const authMiddleware = require('../middleware/auth');
const { createOrder, getMyOrders } = require('../controllers/orderController');

const router = express.Router();

router.use(authMiddleware);

router.post('/', createOrder);
router.get('/myorders', getMyOrders);

module.exports = router;
