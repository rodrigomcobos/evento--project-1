import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Booking from './Booking.js';
import bcrypt from 'bcrypt';

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
    card_number: {
      // encrypted card number
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        if (value) {
          this.setDataValue('card_number', bcrypt.hashSync(value, 10)); // Encrypt card number before storing
        }
      },
    },
    expiration: {
      // card expiration date
      type: DataTypes.STRING,
      allowNull: true,
    },
    cvv: {
      // encrypted CVV
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        if (value) {
          this.setDataValue('cvv', bcrypt.hashSync(value, 10)); // Encrypt CVV before storing
        }
      },
    },
    confirmation_number: {
      // unique confirmation number referring to the booking
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue() {
        return Math.floor(Math.random() * 1000000000).toString(); // Generate a random confirmation number
      },
    },
  },
  {
    tableName: 'payments', // table name in the database
    timestamps: true, // include timestamps (createdAt, updatedAt)
  }
);

// Relationships
// each payment belongs to a booking
Payment.belongsTo(Booking, { foreignKey: 'booking_id' });

export default Payment;
