import express from 'express';
import { bookingController } from '../controllers/bookingController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, bookingController.createBooking);
router.get(
  '/upcoming',
  authMiddleware,
  bookingController.getUserUpcomingEvents
);

export default router;
