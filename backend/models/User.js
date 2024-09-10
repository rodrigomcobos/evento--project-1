import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/db.js';

const User = sequelize.define(
  'User', // Model name
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Do not allow null values
    },
    email: {
      type: DataTypes.STRING,
      unique: true, // Must be unique
      allowNull: false, // Do not allow null values
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Do not allow null values
    },
  },
  {
    tableName: 'users', // Table name in the database
    timestamps: true, // Include timestamps in the table
    hooks: {
      // Lifecycle hook to hash the user's password before saving it to the database
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10); // Generate a salt value
          user.password = await bcrypt.hash(user.password, salt); // Hash the password
        }
      },
      // Lifecycle hook to hash the user's password before updating it in the database
      beforeUpdate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10); // Generate a salt value
          user.password = await bcrypt.hash(user.password, salt); // Hash the password
        }
      },
    },
  }
);

// Instance method to check if the password is valid
// This method is available on each User instance
User.prototype.validPassword = async function (password) {
  // Compare the provided password with the hashed password in the database
  return await bcrypt.compare(password, this.password);
};

export default User;
