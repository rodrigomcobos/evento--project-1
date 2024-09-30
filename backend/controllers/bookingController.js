import initializeDb from '../models/index.js';
import { Op } from 'sequelize';

let Booking;
const init = async () => {
  const db = await initializeDb();
  Booking = db.Booking;
};

init();

export const bookingController = {
  async createBooking(req, res) {
    try {
      const userId = req.session.userId;
      const bookingData = { ...req.body, user_id: userId };

      console.log('Received booking data:', bookingData);

      if (!bookingData.event_id) {
        return res.status(400).json({ message: 'event_id is required' });
      }

      const newBooking = await Booking.create(bookingData);

      res.status(201).json(newBooking);
    } catch (error) {
      console.error('Error creating booking:', error);
      res
        .status(500)
        .json({ message: 'Failed to create booking', error: error.message });
    }
  },

  async getUserUpcomingEvents(req, res) {
    try {
      const userId = req.session.userId;
      console.log('Fetching upcoming events for user:', userId);

      const upcomingEvents = await Booking.findAll({
        where: {
          user_id: userId,
        },
        order: [['event_date', 'ASC']],
        group: ['id'], // Add this line to group by the booking id
      });

      console.log('Upcoming events found:', upcomingEvents.length);
      console.log('Upcoming events:', JSON.stringify(upcomingEvents, null, 2));
      res.json(upcomingEvents);
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      res.status(500).json({ message: 'Failed to fetch upcoming events' });
    }
  },
};
