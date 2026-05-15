const Product = require('../models/Product');

/**
 * Get all products with filtering, sorting, and pagination
 * GET /api/products
 */
const getProducts = async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      size,
      color,
      sort,
      search,
      featured,
      trending,
      page = 1,
      limit = 20,
    } = req.query;

    // Build filter object
    const filter = {};

    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;
    if (trending === 'true') filter.trending = true;
    if (size) filter.sizes = { $in: size.split(',') };
    if (color) filter.colors = { $in: color.split(',') };
    if (search) filter.title = { $regex: search, $options: 'i' };

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Build sort object
    let sortObj = { createdAt: -1 }; // default: newest first
    if (sort === 'price_asc') sortObj = { price: 1 };
    else if (sort === 'price_desc') sortObj = { price: -1 };
    else if (sort === 'popular') sortObj = { averageRating: -1 };
    else if (sort === 'name') sortObj = { title: 1 };

    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(filter).sort(sortObj).skip(skip).limit(Number(limit)),
      Product.countDocuments(filter),
    ]);

    res.json({
      products,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get a single product by ID
 * GET /api/products/:id
 */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get all distinct categories
 * GET /api/products/categories/list
 */
const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Create a new product (Admin only)
 * POST /api/products
 */
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getProducts, getProductById, getCategories, createProduct };
