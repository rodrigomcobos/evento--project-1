// routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models';

// Define the route handler using the express router
const router = express.Router();

// Define the login route handler for POST requests
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // If the user is not found, return an error
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // Handle successful login, e.g., create a session or JWT
      res.status(200).json({ message: 'Login successful' });
    } else {
      // If the passwords don't match, return an error
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
