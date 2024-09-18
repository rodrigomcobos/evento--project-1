import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  event_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Events',
      key: 'id',
    },
  },
  booking_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('confirmed', 'canceled'),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  payment_id: {
    type: DataTypes.STRING,
    references: {
      model: 'Payments',
      key: 'id',
    },
  },
});

export default Booking;
