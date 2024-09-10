import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';
import Event from './Event.js';

const Review = sequelize.define(
  'Review', // Define a Review model
  {
    id: {
      // Primary key
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      // Rating of the review from 1-5
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1, // Minimum rating is 1
        max: 5, // Maximum rating is 5
      },
    },
    review_text: {
      // Text of the review
      type: DataTypes.TEXT,
      allowNull: true, // Can be null
    },
    review_date: {
      // Date of the review
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Default to current date
    },
  },
  {
    tableName: 'reviews', // Table name is reviews
    timestamps: true, // Use timestamps for createdAt and updatedAt
  }
);

// Relationships
// A Review belongs to a User (foreign key is user_id)
Review.belongsTo(User, { foreignKey: 'user_id' });
// A Review belongs to an Event (foreign key is event_id)
Review.belongsTo(Event, { foreignKey: 'event_id' });

export default Review;
