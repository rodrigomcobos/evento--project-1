import initializeDb from '../models/index.js';
import { Op } from 'sequelize';

let Review, User;
const init = async () => {
  try {
    const db = await initializeDb();
    Review = db.Review;
    User = db.User;
    console.log('Review and User models initialized successfully');
  } catch (error) {
    console.error('Failed to initialize models:', error);
  }
};

init().catch(console.error);

export const reviewController = {
  async submitReview(req, res) {
    try {
      console.log('Received review data:', req.body);
      const { event_id, rating, comment, title } = req.body;
      const user_id = req.session.userId;

      if (!user_id) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      console.log('Creating review with:', {
        user_id,
        event_id,
        rating,
        comment,
        title,
      });

      const review = await Review.create({
        user_id,
        event_id,
        rating,
        comment,
        title,
      });

      console.log('Review created successfully:', review);
      res.status(201).json(review);
    } catch (error) {
      console.error('Submit review error:', error);
      res.status(500).json({
        message: 'Server error during review submission',
        error: error.message,
        stack: error.stack,
      });
    }
  },

  async editReview(req, res) {
    try {
      const { id } = req.params;
      const { rating, comment, title } = req.body;
      const userId = req.session.userId;

      const review = await Review.findOne({ where: { id, user_id: userId } });

      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      review.rating = rating;
      review.comment = comment;
      review.title = title;

      await review.save();

      res.json(review);
    } catch (error) {
      console.error('Error editing review:', error);
      res.status(500).json({ message: 'Failed to edit review' });
    }
  },

  async deleteReview(req, res) {
    try {
      const { id } = req.params;
      const user_id = req.session.userId;

      const review = await Review.findOne({ where: { id, user_id } });

      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      await review.destroy();

      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error('Delete review error:', error);
      res.status(500).json({ message: 'Server error during review deletion' });
    }
  },

  async getUserReviews(req, res) {
    try {
      const userId = req.session.userId;
      const reviews = await Review.findAll({
        where: { user_id: userId },
        order: [['createdAt', 'DESC']], // Sort by most recent first
      });
      res.json(reviews);
    } catch (error) {
      console.error('Error fetching user reviews:', error);
      res.status(500).json({ message: 'Failed to fetch user reviews' });
    }
  },

  async getEventReviews(req, res) {
    try {
      const { eventId } = req.params;
      const reviews = await Review.findAll({
        where: { event_id: eventId },
        include: [{ model: User, attributes: ['username'] }],
      });
      res.json(reviews);
    } catch (error) {
      console.error('Error fetching event reviews:', error);
      res.status(500).json({
        message: 'Failed to fetch event reviews',
        error: error.message,
      });
    }
  },
};
