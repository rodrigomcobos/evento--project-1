// models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import { hashPassword } from '../config/bcryptConfig.js';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles',
        key: 'id',
      },
    },
    card_number: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    expiration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cvv: {
      type: DataTypes.STRING(3),
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await hashPassword(user.password);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          user.password = await hashPassword(user.password);
        }
      },
    },
  }
);

export default User;
