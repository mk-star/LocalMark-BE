import express from 'express';
import { registerUser, findUsername, getOrderItems, updateUser } from '../controllers/user.controller.js';

export const userRouter = express.Router();

userRouter.post('/signup', registerUser);
userRouter.post('/find-username', findUsername);
userRouter.get('/:userId/orders', getOrderItems);
userRouter.patch('/:userId', updateUser);
