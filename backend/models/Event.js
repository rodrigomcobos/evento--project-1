import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  available_seats: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  average_rating: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

export default Event;
