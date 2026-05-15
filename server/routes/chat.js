const express = require('express');
const router = express.Router();
const { sendMessage, getRecommendations, updateContext } = require('../controllers/chatController');

// POST /api/chat
router.post('/', sendMessage);

// GET /api/chat/recommendations
router.get('/recommendations', getRecommendations);

// POST /api/chat/context
router.post('/context', updateContext);

module.exports = router;
