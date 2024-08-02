import express from 'express';
import UserController from '../controllers/user.controller.js';

export const userRouter = express.Router();

userRouter.post('/signup', UserController.registerUser);
userRouter.post('/find-username', UserController.findUsername);
userRouter.get('/orders', UserController.getOrderItems);
userRouter.patch('/:id', UserController.updateUser);
