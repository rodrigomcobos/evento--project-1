// models/Payment.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import { hashPassword } from '../config/bcryptConfig.js';

const Payment = sequelize.define(
  'Payment',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    booking_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Bookings',
        key: 'id',
      },
    },
    payment_status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    payment_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    card_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    expiration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cvv: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (payment) => {
        if (payment.card_number) {
          payment.card_number = await hashPassword(payment.card_number);
        }
        if (payment.expiration) {
          payment.expiration = await hashPassword(payment.expiration);
        }
        if (payment.cvv) {
          payment.cvv = await hashPassword(payment.cvv);
        }
      },
      beforeUpdate: async (payment) => {
        if (payment.card_number) {
          payment.card_number = await hashPassword(payment.card_number);
        }
        if (payment.expiration) {
          payment.expiration = await hashPassword(payment.expiration);
        }
        if (payment.cvv) {
          payment.cvv = await hashPassword(payment.cvv);
        }
      },
    },
  }
);

export default Payment;
