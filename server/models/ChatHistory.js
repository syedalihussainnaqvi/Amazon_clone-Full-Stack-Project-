const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  metadata: {
    intent: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  },
});

const chatHistorySchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  messages: [messageSchema],
  context: {
    lastIntent: String,
    preferredCategories: [String],
    conversationTurn: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

chatHistorySchema.pre('save', function () {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('ChatHistory', chatHistorySchema);
