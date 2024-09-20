import { Sequelize } from 'sequelize';
import { connectToDB } from '../config/db.js';

export const db = await connectToDB('postgresql:///event_booking_system');

// Import models
import User from './User.js';
import Event from './Event.js';
import Booking from './Booking.js';
import Review from './Review.js';
import Role from './Role.js';
import Payment from './Payment.js';

// Initialize models
User.init(User.attributes, { sequelize: db, modelName: 'User' });
Event.init(Event.attributes, { sequelize: db, modelName: 'Event' });
Booking.init(Booking.attributes, { sequelize: db, modelName: 'Booking' });
Review.init(Review.attributes, { sequelize: db, modelName: 'Review' });
Role.init(Role.attributes, { sequelize: db, modelName: 'Role' });
Payment.init(Payment.attributes, { sequelize: db, modelName: 'Payment' });

// Set up associations
User.associate(db.models);
Event.associate(db.models);
Booking.associate(db.models);
Review.associate(db.models);
Role.associate(db.models);
Payment.associate(db.models);

export { User, Event, Booking, Review, Role, Payment };
