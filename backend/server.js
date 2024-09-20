import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
// import viteExpress from 'vite-express';

dotenv.config();

const app = express();
const PORT = process.env.VITE_PORT || 5001; // 0 will assign a random available port;

// Middleware
// CORS configuration
app.use(
  cors({
    origin: process.env.VITE_FRONTEND_URL,
    credentials: true,
  })
);

// Body parsing middleware
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

// Database connection and server start
const startServer = async () => {
  try {
    const sequelize = await connectToDB();

    // Sync all models with the database
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
