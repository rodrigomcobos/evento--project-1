import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Review = sequelize.define('Review', {
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
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  review_text: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  review_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default Review;
