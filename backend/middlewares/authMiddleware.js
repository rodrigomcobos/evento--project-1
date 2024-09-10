import bcrypt from 'bcrypt';
import { User } from '../models';

// Middleware to verify if the user is authenticated (e.g., checking session)
export const isAuthenticated = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // 1. Try to find a user with the given email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // 2. If no user is found, return 401 Unauthorized
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 3. Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // 4. If the password is invalid, return 401 Unauthorized
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 5. If the password is valid, pass the user info to the next middleware
    req.user = user;
    next();
  } catch (error) {
    // 6. If there's a server error, return 500 Internal Server Error
    return res.status(500).json({ message: 'Server error' });
  }
};

// Middleware for role-based authorization
export const isAdmin = (req, res, next) => {
  // 1. Check if a user is authenticated and has a role_id of 1 (admin)
  if (req.user && req.user.role_id === 1) {
    // 2. If the user is an admin, call the next middleware
    next();
  } else {
    // 3. If the user is not an admin, return 403 Forbidden
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

// Middleware for checking if a user is a standard user
export const isUser = (req, res, next) => {
  // 1. Check if a user is authenticated and has a role_id of 2 (user)
  if (req.user && req.user.role_id === 2) {
    // 2. If the user is a standard user, call the next middleware
    next();
  } else {
    // 3. If the user is not a standard user, return 403 Forbidden
    res.status(403).json({ message: 'Access denied.' });
  }
};
