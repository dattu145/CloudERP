import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// ── Helper: Generate signed JWT token ────────────────────────────
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// ── Helper: Build safe user payload (no password) ─────────────────
const safeUser = (user) => ({
  _id:       user._id,
  name:      user.name,
  email:     user.email,
  role:      user.role,
  isActive:  user.isActive,
  createdAt: user.createdAt,
});

// ────────────────────────────────────────────────────────────────────
// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
// ────────────────────────────────────────────────────────────────────
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // 1. Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email, and password.',
    });
  }

  try {
    // 2. Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }

    // 3. Create the user (password hashed by pre-save hook in model)
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: role || 'employee',
    });

    // 4. Generate JWT
    const token = generateToken(user._id);

    // 5. Respond
    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      token,
      user: safeUser(user),
    });
  } catch (error) {
    // Handle Mongoose duplicate key error (race condition fallback)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join('. '),
      });
    }

    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

// ────────────────────────────────────────────────────────────────────
// @route   POST /api/auth/login
// @desc    Authenticate user and return token
// @access  Public
// ────────────────────────────────────────────────────────────────────
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // 1. Validate required fields
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide email and password.',
    });
  }

  try {
    // 2. Find user — explicitly select password (excluded by default via `select: false`)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      // Use generic message to prevent email enumeration
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // 3. Check if account is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated. Contact your administrator.',
      });
    }

    // 4. Compare passwords
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // 5. Generate JWT
    const token = generateToken(user._id);

    // 6. Respond
    res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: safeUser(user),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

// ────────────────────────────────────────────────────────────────────
// @route   GET /api/auth/me
// @desc    Get logged-in user's profile
// @access  Protected
// ────────────────────────────────────────────────────────────────────
const getMe = async (req, res) => {
  try {
    // req.user is attached by the protect middleware
    res.status(200).json({
      success: true,
      user: safeUser(req.user),
    });
  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

export { registerUser, loginUser, getMe };
