import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Role = sequelize.define(
  'Role', // model name
  {
    id: {
      // define a primary key
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // automatically increment the id
    },
    role_name: {
      // define role_name column
      type: DataTypes.STRING,
      allowNull: false, // do not allow null values
    },
  },
  {
    tableName: 'roles', // table name is roles
    timestamps: false, // do not include timestamps in the table
  }
);

export default Role;
