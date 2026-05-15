const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: String,
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0,
  },
  originalPrice: {
    type: Number,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ['Shirts', 'T-Shirts', 'Pants', 'Shoes', 'Accessories', 'Activewear', 'Outerwear'],
  },
  image: {
    type: String,
    required: true,
  },
  images: [String],
  description: {
    type: String,
    required: true,
  },
  sizes: {
    type: [String],
    default: ['S', 'M', 'L', 'XL'],
  },
  colors: {
    type: [String],
    default: ['Black'],
  },
  stock: {
    type: Number,
    default: 50,
    min: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  trending: {
    type: Boolean,
    default: false,
  },
  reviews: [reviewSchema],
  averageRating: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
