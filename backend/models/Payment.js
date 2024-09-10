import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Booking from './Booking.js';

const Payment = sequelize.define(
  'Payment', // model name
  {
    id: {
      // primary key
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      // payment amount
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_status: {
      // status of the payment
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      allowNull: false,
    },
  },
  {
    tableName: 'payments', // table name in the database
    timestamps: true, // whether to include timestamps (createdAt, updatedAt)
  }
);

// Relationships
// each payment belongs to a booking
Payment.belongsTo(Booking, { foreignKey: 'booking_id' });

export default Payment;
