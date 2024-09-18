// config/bcryptConfig.js
import bcrypt from 'bcrypt';

const saltRounds = parseInt(process.env.VITE_BCRYPT_SALT_ROUNDS, 10);

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
