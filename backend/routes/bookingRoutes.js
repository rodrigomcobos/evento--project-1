import express from 'express';
import { bookingController } from '../controllers/bookingController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

console.log('Registering booking routes...');

// POST /booking: Create a new booking
router.post('/', authMiddleware, bookingController.createBooking);
console.log('POST / route registered');

// GET /booking/upcoming: Get the upcoming events for the logged in user
router.get(
  '/upcoming',
  authMiddleware,
  bookingController.getUserUpcomingEvents
);
console.log('GET /upcoming route registered');

// GET /booking/past: Get the past events for the logged in user
router.get('/past', authMiddleware, bookingController.getUserPastEvents);
console.log('GET /past route registered');

console.log('All booking routes registered');

export default router;
