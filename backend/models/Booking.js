import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';
import Event from './Event.js';

// Define the Booking model
const Booking = sequelize.define(
  'Booking',
  {
    // Primary key and auto-incrementing id
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Booking date, defaults to the current date
    booking_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    // Booking status, either confirmed or canceled
    status: {
      type: DataTypes.ENUM('confirmed', 'canceled'),
      allowNull: false,
    },
  },
  {
    // Table name is bookings
    tableName: 'bookings',
    // Timestamps are enabled
    timestamps: true,
  }
);

// Establish relationships with User and Event models
Booking.belongsTo(User, { foreignKey: 'user_id' });
Booking.belongsTo(Event, { foreignKey: 'event_id' });

// Export the Booking model
export default Booking;
