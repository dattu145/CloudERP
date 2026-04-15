import express from 'express';
import { getDashboardAnalytics, getAIInsights } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', protect, getDashboardAnalytics);
router.get('/insights', protect, getAIInsights);

export default router;
