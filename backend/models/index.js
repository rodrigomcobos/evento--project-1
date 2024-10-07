import { Sequelize } from 'sequelize';
import { connectToDB } from '../config/db.js';

// Import model definitions
import UserModel from './User.js';
import EventModel from './Event.js';
import BookingModel from './Booking.js';
import ReviewModel from './Review.js';
import RoleModel from './Role.js';
import PaymentModel from './Payment.js';
import VenueModel from './Venue.js';
import ClassificationModel from './Classification.js';

// Initialize the database connection
const initializeDb = async () => {
  const sequelize = await connectToDB('postgresql:///event_booking_system');

  // Define the database models
  const db = {
    sequelize,
    Sequelize,
    User: UserModel,
    Event: EventModel,
    Booking: BookingModel,
    Review: ReviewModel,
    Role: RoleModel,
    Payment: PaymentModel,
    Venue: VenueModel,
    Classification: ClassificationModel,
  };

  // Initialize models
  Object.values(db).forEach((model) => {
    if (model.init) {
      model.init(sequelize);
    }
  });

  // Run model associations
  Object.values(db).forEach((model) => {
    if (model.associate && typeof model.associate === 'function') {
      model.associate(db);
    }
  });

  return db;
};

export default initializeDb;
