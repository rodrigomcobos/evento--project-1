import express from 'express';
import { bookingController } from '../controllers/bookingController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
// POST /booking: Create a new booking
// Requires authentication and a valid user session
router.post('/', authMiddleware, bookingController.createBooking);

// GET /booking/upcoming: Get the upcoming events for the logged in user
// Requires authentication and a valid user session
router.get(
  '/upcoming',
  authMiddleware,
  bookingController.getUserUpcomingEvents
);

export default router;
