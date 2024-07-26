import express from 'express'
import {createUser,getUser,updateUser ,deleteUser}  from '../controllers/userController.js'

const router = express.Router();

router.post('/users',createUser);

// router to get user by id 
router.get('/users/:id',getUser);

// router to update the user 
router.put('/users/:id',updateUser);

router.delete('/users/:id',deleteUser);

export default router;