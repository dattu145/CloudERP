import express from 'express';
import { getTransactions, createTransaction, getFinanceSummary } from '../controllers/financeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/transactions')
  .get(getTransactions)
  .post(createTransaction);

router.get('/summary', getFinanceSummary);

export default router;
