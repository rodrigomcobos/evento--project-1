import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Event = sequelize.define(
  'Event', // define a new model
  {
    id: {
      // the primary key, auto-incrementing
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      // the name of the event
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      // the description of the event
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      // the date of the event
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      // the location of the event
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      // the maximum number of seats available
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    available_seats: {
      // the current number of available seats
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'events', // the name of the table in the database
    timestamps: true, // whether to include timestamps in the table
  }
);

export default Event;
