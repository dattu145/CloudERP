import express from 'express';
import { getEmployees, createEmployee, updateEmployee } from '../controllers/hrController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/employees')
  .get(getEmployees)
  .post(createEmployee);

router.put('/employees/:id', updateEmployee);

export default router;
