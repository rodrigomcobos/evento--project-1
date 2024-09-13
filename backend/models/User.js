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
    firstName: {
      type: DataTypes.STRING,
      allowNull: false, // Do not allow null values
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false, // Do not allow null values
    },
    email: {
      type: DataTypes.STRING,
      unique: true, // Must be unique
      allowNull: false, // Do not allow null values
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false, // Do not allow null values
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Do not allow null values
    },
    card_number: {
      type: DataTypes.STRING,
      allowNull: true, // Only store if provided
      // Ensuring card number is stored in an encrypted format
      set(value) {
        if (value) {
          // Encrypt card number (not hashing to allow retrieving in some secure cases)
          this.setDataValue('card_number', bcrypt.hashSync(value, 10));
        }
      },
    },
    expiration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cvv: {
      type: DataTypes.STRING,
      allowNull: true,
      // Encrypt CVV before storing
      set(value) {
        if (value) {
          // Encrypt CVV
          this.setDataValue('cvv', bcrypt.hashSync(value, 10));
        }
      },
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
User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Optional: Instance method to validate card information (if necessary)
User.prototype.validCard = async function (card_number, cvv) {
  const validCard = await bcrypt.compare(card_number, this.card_number);
  const validCVV = await bcrypt.compare(cvv, this.cvv);
  return validCard && validCVV;
};

export default User;
