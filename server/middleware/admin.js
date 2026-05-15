const User = require('../models/User');

/**
 * Admin Authorization Middleware
 * Verifies if the user has admin privileges
 */
const adminMiddleware = async (req, res, next) => {
  try {
    // req.user is set by authMiddleware which must run first
    const user = await User.findById(req.user.id);
    
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = adminMiddleware;
