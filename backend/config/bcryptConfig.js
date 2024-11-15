const bcrypt = require('bcrypt');

const saltRounds = parseInt(process.env.VITE_BCRYPT_SALT_ROUNDS, 10);

// Hashes a given password using the set salt rounds
exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

// Compares a given password to a hashed password
exports.comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
