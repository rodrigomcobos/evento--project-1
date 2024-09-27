import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import { userController } from './controllers/userController.js';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.VITE_PORT || 5001;

// Middleware
app.use(
  cors({
    origin: process.env.VITE_FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: process.env.VITE_SESSION_SECRET || 'fallback_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.VITE_NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Routes
app.use('/api/users', userRoutes);

// Ticketmaster API proxy route
app.get('/api/ticketmaster/*', async (req, res) => {
  try {
    const apiKey = process.env.VITE_TICKETMASTER_API_KEY;
    if (!apiKey) {
      console.error('Ticketmaster API key is not set');
      return res.status(500).json({ error: 'Server configuration error' });
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

// Ticketmaster search route
app.get('/api/ticketmaster/events', async (req, res) => {
  try {
    const { keyword } = req.query;
    const apiKey = process.env.VITE_TICKETMASTER_API_KEY;
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

// Database connection and server start
const startServer = async () => {
  try {
    const sequelize = await connectToDB();
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
