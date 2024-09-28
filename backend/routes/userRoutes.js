import express from 'express';
import { userController } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Sign in route
router.post('/signin', userController.signIn);

// Sign up route
router.post('/signup', userController.signUp);

// Get user profile route
router.get('/profile', authMiddleware, userController.getProfile);

// Sign out route
router.post('/signout', authMiddleware, userController.signOut);

// Update user profile route
router.put('/profile', authMiddleware, userController.updateProfile);

export default router;
