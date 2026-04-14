import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// ── Public Routes ─────────────────────────────────────────────────
router.post('/register', registerUser);
router.post('/login',    loginUser);

// ── Protected Routes ──────────────────────────────────────────────
router.get('/me', protect, getMe);

export default router;
