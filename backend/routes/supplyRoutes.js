import express from 'express';
import { getContacts, createContact, getOrders, createOrder } from '../controllers/supplyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/contacts')
  .get(getContacts)
  .post(createContact);

router.route('/orders')
  .get(getOrders)
  .post(createOrder);

export default router;
