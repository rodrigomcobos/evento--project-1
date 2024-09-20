import express from 'express';
import { userController } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signin', userController.signIn);
router.post('/signup', userController.signUp);
router.get('/profile', authMiddleware, userController.getProfile);
router.post('/signout', authMiddleware, userController.signOut);

export default router;
