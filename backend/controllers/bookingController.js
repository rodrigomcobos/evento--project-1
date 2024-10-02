import initializeDb from '../models/index.js';
import { Op } from 'sequelize';

let Booking;
const init = async () => {
  const db = await initializeDb();
  Booking = db.Booking;
};

init();

// Booking Controller functions
export const bookingController = {
  // Create Booking (POST)
  // Create a new booking for the logged in user
  async createBooking(req, res) {
    try {
      // Get the user_id from the session
      const userId = req.session.userId;

      // Add the user_id to the booking data
      const bookingData = { ...req.body, user_id: userId };

      console.log('Received booking data:', bookingData);

      // Check if event_id is present
      if (!bookingData.event_id) {
        return res.status(400).json({ message: 'event_id is required' });
      }

      // Create the new booking
      const newBooking = await Booking.create(bookingData);

      // Return the new booking
      res.status(201).json(newBooking);
    } catch (error) {
      console.error('Error creating booking:', error);
      // Return an error message with the status code 500
      res
        .status(500)
        .json({ message: 'Failed to create booking', error: error.message });
    }
  },

  // Get Upcoming Events for the logged in user (READ)
  // This API endpoint fetches all the upcoming events that the logged in user has booked
  async getUserUpcomingEvents(req, res) {
    try {
      // Get the user_id from the session
      const userId = req.session.userId;

      // Get the current date
      const currentDate = new Date();

      // Fetch all the upcoming events that the user has booked
      const upcomingEvents = await Booking.findAll({
        where: {
          user_id: userId,
          event_date: {
            // Get all events that are greater than or equal to the current date
            [Op.gte]: currentDate,
          },
        },
        // Order the events by their event_date in ascending order
        order: [['event_date', 'ASC']],
        // Group the results by the id column
        group: ['id'],
      });

      // Log the upcoming events
      console.log('Upcoming events:', JSON.stringify(upcomingEvents, null, 2));

      // Return the upcoming events
      res.json(upcomingEvents);
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      // Return an error message with the status code 500
      res.status(500).json({ message: 'Failed to fetch upcoming events' });
    }
  },

  // Get Past Events for the logged in user (READ)
  // This API endpoint fetches all the past events that the logged in user has booked
  async getUserPastEvents(req, res) {
    try {
      // Get the user_id from the session
      const userId = req.session.userId;

      // Get the current date
      const currentDate = new Date();

      // Fetch all the past events that the user has booked
      const pastEvents = await Booking.findAll({
        where: {
          user_id: userId,
          event_date: {
            // Get all events that are less than the current date
            [Op.lt]: currentDate,
          },
        },
        // Order the events by their event_date in descending order
        order: [['event_date', 'DESC']],
        // Group the results by the id column
        group: ['id'],
      });

      // Log the past events
      console.log('Past events:', JSON.stringify(pastEvents, null, 2));

      // Return the past events
      res.json(pastEvents);
    } catch (error) {
      console.error('Error fetching past events:', error);
      // Return an error message with the status code 500
      res.status(500).json({ message: 'Failed to fetch past events' });
    }
  },
};
