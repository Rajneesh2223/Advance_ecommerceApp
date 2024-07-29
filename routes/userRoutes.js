import express from 'express';
import { createUser, getUser, updateUser, deleteUser } from '../controllers/userController.js';
import { authenticateToken, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to create a new user
router.post('/users', createUser);

// Route to get a user by id
router.get('/users/:id', authenticateToken, isAdmin, getUser);

// Route to update a user
router.put('/users/:id', authenticateToken, isAdmin, updateUser);

// Route to delete a user
router.delete('/users/:id', authenticateToken, isAdmin, deleteUser);

export default router;
