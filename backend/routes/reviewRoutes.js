import express from 'express';
import { reviewController } from '../controllers/reviewController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Submit Review (POST)
// This route is protected by the authMiddleware, which checks if a user is logged in
// The reviewController.submitReview function will be called to create a new review
router.post('/', authMiddleware, reviewController.submitReview);

// Edit Review (PUT)
// This route is protected by the authMiddleware, which checks if a user is logged in
// The reviewController.editReview function will be called to update an existing review
router.put('/:id', authMiddleware, reviewController.editReview);

// Delete Review (DELETE)
// This route is protected by the authMiddleware, which checks if a user is logged in
// The reviewController.deleteReview function will be called to delete an existing review
router.delete('/:id', authMiddleware, reviewController.deleteReview);

// Get User Reviews (GET)
// This route is protected by the authMiddleware, which checks if a user is logged in
// The reviewController.getUserReviews function will be called to retrieve all reviews written by the user
router.get('/user', authMiddleware, reviewController.getUserReviews);

// Get Event Reviews (GET)
// This route is open to everyone, no authentication required
// The reviewController.getEventReviews function will be called to retrieve all reviews for a specific event
router.get('/event/:eventId', reviewController.getEventReviews);

export default router;
