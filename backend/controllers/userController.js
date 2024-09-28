import initializeDb from '../models/index.js';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

let User;
let sequelize;
// Initialize the database connection and load the User model and Sequelize instance
const init = async () => {
  // Call the initializeDb function to connect to the database and load the models
  const db = await initializeDb();
  // Store the User model and Sequelize instance in the User and sequelize variables
  User = db.User;
  sequelize = db.sequelize;
};

// Call the init function to initialize the database connection and load the User model
init();

export const userController = {
  // Session check
  async sessionCheck(req, res) {
    // Check if the user is logged in by checking if the session ID exists in the session store
    if (req.session.userId) {
      try {
        // Find the user by the session ID
        const user = await User.findByPk(req.session.userId, {
          attributes: { exclude: ['password'] },
        });
        if (user) {
          // Return the user object without the password
          return res.json({ isLoggedIn: true, user });
        }
      } catch (error) {
        console.error('Session check error:', error);
        return res
          .status(500)
          .json({ message: 'Server error during session check' });
      }
    }
    // If the user is not logged in, return false
    res.json({ isLoggedIn: false });
  },

  // Sign In
  async signIn(req, res) {
    // Get the email and password from the request body
    const { email, password } = req.body;
    try {
      // Find the user by the email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        // If the user is not found, return an error
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      // Compare the password from the request body with the password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        // If the password is invalid, return an error
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      // Set the session ID to the user ID
      req.session.userId = user.id;
      // Save the session
      req.session.save((err) => {
        if (err) {
          console.error('Session save error:', err);
          return res.status(500).json({ message: 'Error creating session' });
        }
        // Return the user object without the password
        res.json({
          user: { id: user.id, username: user.username, email: user.email },
        });
      });
    } catch (error) {
      console.error('Sign-in error:', error);
      res.status(500).json({ message: 'Server error during sign in' });
    }
  },

  async signUp(req, res) {
    // Get the username, first name, last name, email, phone, and password from the request body
    const { username, first_name, last_name, email, phone, password } =
      req.body;
    try {
      console.log('Received sign-up request:', {
        username,
        first_name,
        last_name,
        email,
        phone,
      });

      // Check if the user already exists
      console.log('Checking for existing user...');
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ email }, { username }],
        },
      });

      if (existingUser) {
        // If the user already exists, return an error
        console.log('User already exists');
        return res
          .status(400)
          .json({ message: 'Email or username already in use' });
      }

      // Hash the password
      console.log('Hashing password...');
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create a new user
      console.log('Creating new user...');
      const newUser = await User.create({
        first_name,
        last_name,
        username,
        email,
        phone,
        password: hashedPassword,
      });
      console.log('New user created:', newUser.id);

      // Set the session ID to the user ID
      req.session.userId = newUser.id;

      // Return the user object without the password
      res.status(201).json({
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
        },
      });
    } catch (error) {
      console.error('Sign-up error:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      if (error.errors) {
        console.error('Validation errors:', error.errors);
      }
      res.status(500).json({
        message: 'Server error during sign up',
        error: error.message,
        name: error.name,
        stack: error.stack,
        details: error.errors ? error.errors : 'No additional details',
      });
    }
  },

  // Sign Out
  async signOut(req, res) {
    // Destroy the session
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error('Session destruction error:', err);
          return res
            .status(500)
            .json({ message: 'Could not log out, please try again' });
        }
        // Clear the session cookie
        res.clearCookie('connect.sid');
        return res.json({ message: 'Logged out successfully' });
      });
    } else {
      // If the session is not found, return a success message
      res.status(200).json({ message: 'Already logged out' });
    }
  },

  // Get User Profile
  async getProfile(req, res) {
    // Find the user by the session ID
    try {
      const user = await User.findByPk(req.session.userId, {
        attributes: { exclude: ['password'] },
      });
      if (!user) {
        // If the user is not found, return an error
        return res.status(404).json({ message: 'User not found' });
      }
      // Return the user object without the password
      res.json(user);
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        message: 'Server error during profile fetch',
        error: error.message,
      });
    }
  },

  // Update User Profile
  async updateProfile(req, res) {
    console.log('updateProfile method called');
    console.log('Session ID:', req.session.userId);
    console.log('Request body:', req.body);

    if (!req.session.userId) {
      // If the user is not logged in, return an error
      return res.status(401).json({ message: 'User not authenticated' });
    }

    try {
      // Find the user by the session ID
      const user = await User.findByPk(req.session.userId);
      if (!user) {
        // If the user is not found, return an error
        console.log('User not found for ID:', req.session.userId);
        return res.status(404).json({ message: 'User not found' });
      }

      console.log('User found:', user.toJSON());

      // Update the user properties
      const { first_name, last_name, username, email, phone, password } =
        req.body;

      if (first_name) user.first_name = first_name;
      if (last_name) user.last_name = last_name;
      if (username) user.username = username;
      if (email) user.email = email;
      if (phone) user.phone = phone;
      if (password) {
        // Hash the password
        const saltRounds = 10;
        user.password = await bcrypt.hash(password, saltRounds);
      }

      // Save the user
      await user.save();

      console.log('User updated:', user.toJSON());

      // Return the user object without the password
      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({
        message: 'Server error during profile update',
        error: error.message,
      });
    }
  },
};

