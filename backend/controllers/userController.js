import initializeDb from '../models/index.js';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize'; // Add this line

let User;
let sequelize;
const init = async () => {
  const db = await initializeDb();
  User = db.User;
  sequelize = db.sequelize;
};

init();

export const userController = {
  // Session check
  async sessionCheck(req, res) {
    if (req.session.userId) {
      try {
        const user = await User.findByPk(req.session.userId, {
          attributes: { exclude: ['password'] },
        });
        if (user) {
          return res.json({ isLoggedIn: true, user });
        }
      } catch (error) {
        console.error('Session check error:', error);
        return res
          .status(500)
          .json({ message: 'Server error during session check' });
      }
    }
    res.json({ isLoggedIn: false });
  },

  // Sign In
  async signIn(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      req.session.userId = user.id;
      req.session.save((err) => {
        if (err) {
          console.error('Session save error:', err);
          return res.status(500).json({ message: 'Error creating session' });
        }
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

      console.log('Checking for existing user...');
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ email }, { username }],
        },
      });

      if (existingUser) {
        console.log('User already exists');
        return res
          .status(400)
          .json({ message: 'Email or username already in use' });
      }

      console.log('Hashing password...');
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

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

      console.log('Setting session...');
      req.session.userId = newUser.id;

      console.log('Sending response...');
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
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          console.error('Session destruction error:', err);
          return res
            .status(500)
            .json({ message: 'Could not log out, please try again' });
        }
        res.clearCookie('connect.sid'); // clear the session cookie
        return res.json({ message: 'Logged out successfully' });
      });
    } else {
      res.status(200).json({ message: 'Already logged out' });
    }
  },

  // Get User Profile
  async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.session.userId, {
        attributes: { exclude: ['password'] },
      });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        message: 'Server error during profile fetch',
        error: error.message,
      });
    }
  },
};
