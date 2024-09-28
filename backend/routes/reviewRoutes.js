import express from 'express';
import { reviewController } from '../controllers/reviewController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, reviewController.submitReview);
router.put('/:id', authMiddleware, reviewController.editReview);
router.delete('/:id', authMiddleware, reviewController.deleteReview);
router.get('/user', authMiddleware, reviewController.getUserReviews);
router.get('/event/:eventId', reviewController.getEventReviews);

export default router;
