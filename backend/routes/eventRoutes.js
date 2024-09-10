import express from 'express';
import { isAuthenticated, isAdmin } from '../middlewares/authMiddleware';
import {
  createEvent,
  getEvents,
  deleteEvent,
} from '../controllers/eventController';

const router = express.Router();

// Only authenticated users can view events
// This route is protected by the isAuthenticated middleware, which checks if a user is logged in
router.get('/', isAuthenticated, getEvents);

// Only admin users can create or delete events
// This route is protected by the isAuthenticated middleware, which checks if a user is logged in
// and by the isAdmin middleware, which checks if the user has the role of admin
router.post('/create', isAuthenticated, isAdmin, createEvent);
router.delete('/:id', isAuthenticated, isAdmin, deleteEvent);

export default router;
