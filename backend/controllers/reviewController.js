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
  // Submit Review (POST)
  async submitReview(req, res) {
    try {
      // Get the review data from the request body
      const { event_id, rating, comment, title } = req.body;
      const user_id = req.session.userId;

      // Check if the user is authenticated
      if (!user_id) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      // Create the new review with the given data
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

      // Return the newly created review
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

  // Edit Review (PUT)
  async editReview(req, res) {
    try {
      const { id } = req.params;
      const { rating, comment, title } = req.body;
      const userId = req.session.userId;

      // Find the review to edit
      const review = await Review.findOne({ where: { id, user_id: userId } });

      // If review not found, send 404 response
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      // Update the review with the provided data
      review.rating = rating;
      review.comment = comment;
      review.title = title;

      // Save the updated review
      await review.save();

      // Return the updated review
      res.json(review);
    } catch (error) {
      console.error('Error editing review:', error);
      res.status(500).json({ message: 'Failed to edit review' });
    }
  },

  // Delete Review (DELETE)
  // This API endpoint is used to delete a review by its id
  // It checks if the review exists and if the user is the owner of the review
  // If the review is found, it deletes the review and returns a success message
  // If the review is not found, it returns a 404 response
  // If there is an error, it returns a 500 response with the error message
  async deleteReview(req, res) {
    try {
      const { id } = req.params;
      const user_id = req.session.userId;

      // Find the review by id and check if the user is the owner
      const review = await Review.findOne({ where: { id, user_id } });

      // If review not found, send 404 response
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      // Delete the review
      await review.destroy();

      // Return success message
      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error('Delete review error:', error);
      res.status(500).json({ message: 'Server error during review deletion' });
    }
  },

  // Get User Reviews (READ)
  // Get User Reviews (READ)
  // This API endpoint is used to fetch all the reviews by the logged in user
  // It fetches all the reviews with the user_id matching the session user_id
  // and returns them in the response
  async getUserReviews(req, res) {
    try {
      const userId = req.session.userId;
      const reviews = await Review.findAll({
        where: { user_id: userId },
        order: [['updatedAt', 'DESC']], // Use updatedAt instead of createdAt
      });
      res.json(reviews);
    } catch (error) {
      console.error('Error fetching user reviews:', error);
      res.status(500).json({ message: 'Failed to fetch user reviews' });
    }
  },

  // Get Event Reviews (READ)
  // Get Event Reviews (READ)
  // This API endpoint is used to fetch all the reviews of a particular event
  // It fetches all the reviews with the event_id matching the event_id param
  // and returns them in the response
  async getEventReviews(req, res) {
    try {
      const { eventId } = req.params;
      const reviews = await Review.findAll({
        where: { event_id: eventId },
        include: [{ model: User, attributes: ['username'] }], // Include the username of the user who wrote the review
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
