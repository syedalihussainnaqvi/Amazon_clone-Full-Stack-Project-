const mongoose = require('mongoose');

const userPreferencesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  favoriteStyles: { type: [String], default: [] },
  recentCategories: { type: [String], default: [] },
  interactionHistory: [
    {
      intent: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  updatedAt: { type: Date, default: Date.now },
});

userPreferencesSchema.pre('save', function () {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('UserPreferences', userPreferencesSchema);
