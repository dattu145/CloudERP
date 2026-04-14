import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// ── Protect Route Middleware ───────────────────────────────────────
// Verifies JWT from the Authorization header: "Bearer <token>"
const protect = async (req, res, next) => {
  let token;

  // 1. Check if Authorization header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.',
    });
  }

  try {
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach user to request object (exclude password)
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User belonging to this token no longer exists.',
      });
    }

    if (!req.user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Contact admin.',
      });
    }

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token.' });
    }
    if (error.name === 'TokenExpiredError') {
      return res
        .status(401)
        .json({ success: false, message: 'Token expired. Please log in again.' });
    }
    return res.status(500).json({ success: false, message: 'Server error during authentication.' });
  }
};

// ── Role-Based Access Middleware (optional, for future use) ────────
// Usage: router.get('/admin-only', protect, authorize('admin'), handler)
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access forbidden. Required role(s): ${roles.join(', ')}`,
      });
    }
    next();
  };
};

export { protect, authorize };
