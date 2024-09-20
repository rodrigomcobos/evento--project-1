const bcrypt = require('bcrypt');

const saltRounds = parseInt(process.env.VITE_BCRYPT_SALT_ROUNDS, 10);

exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

exports.comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
