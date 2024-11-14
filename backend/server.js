import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import { userController } from './controllers/userController.js';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || process.env.VITE_PORT || 5001;

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.VITE_FRONTEND_URL
        : ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  })
);

// Express middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration and middleware
app.use(
  session({
    secret: process.env.VITE_SESSION_SECRET || 'fallback_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
    proxy: process.env.NODE_ENV === 'production', // trust the reverse proxy in production
  })
);

// Routes for user, review, and booking APIs
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/bookings', bookingRoutes);
console.log('Booking routes middleware registered');

// Ticketmaster API proxy route for other API calls that don't have a dedicated route
app.get('/api/ticketmaster/*', async (req, res) => {
  try {
    // Check both environment variables for the API key
    const apiKey =
      process.env.TICKETMASTER_API_KEY || process.env.VITE_TICKETMASTER_API_KEY;

    if (!apiKey) {
      console.error('Ticketmaster API key is not set in environment variables');
      console.log('Available environment variables:', {
        TICKETMASTER_API_KEY: process.env.TICKETMASTER_API_KEY
          ? 'set'
          : 'not set',
        VITE_TICKETMASTER_API_KEY: process.env.VITE_TICKETMASTER_API_KEY
          ? 'set'
          : 'not set',
      });
      return res
        .status(500)
        .json({ error: 'Server configuration error - API key not found' });
    }

    const path = req.params[0];
    const apiUrl = `https://app.ticketmaster.com/discovery/v2/${path}`;

    console.log('Proxying request to:', apiUrl);
    console.log('Query params:', req.query);

    const response = await axios.get(apiUrl, {
      params: {
        ...req.query,
        apikey: apiKey,
      },
    });

    console.log('Ticketmaster API response status:', response.status);
    res.json(response.data);
  } catch (error) {
    console.error(
      'Ticketmaster API error:',
      error.response ? error.response.data : error.message
    );
    res.status(error.response ? error.response.status : 500).json({
      error: 'An error occurred while fetching data from Ticketmaster',
      details: error.response ? error.response.data : error.message,
    });
  }
});

// Ticketmaster search route for events by keyword
app.get('/api/ticketmaster/events', async (req, res) => {
  try {
    const { keyword } = req.query;
    const apiKey =
      process.env.TICKETMASTER_API_KEY || process.env.VITE_TICKETMASTER_API_KEY;

    if (!apiKey) {
      console.error('Ticketmaster API key is not set in environment variables');
      return res
        .status(500)
        .json({ error: 'Server configuration error - API key not found' });
    }

    const response = await axios.get(
      'https://app.ticketmaster.com/discovery/v2/events.json',
      {
        params: {
          apikey: apiKey,
          keyword: keyword,
          size: 20, // Adjust as needed
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error searching Ticketmaster events:', error);
    res.status(500).json({
      error: 'Error searching events',
      details: error.response?.data || error.message,
    });
  }
});

// Database connection and server start function
const startServer = async () => {
  try {
    // Connect to the database
    const sequelize = await connectToDB();

    // Synchronize all models
    await sequelize.sync();
    console.log('All models were synchronized successfully.');

    // Start the server on the specified port
    app.listen(PORT, '0.0.0.0', () => {
      console.log(
        `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
      );
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
