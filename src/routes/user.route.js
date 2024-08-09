import express from "express";
import asyncHandler from "express-async-handler";
import { jwtMiddleware } from "../../config/userJwtMiddleWare.js";
import { registerUser } from '../controllers/user.controller.js';

export const userRouter = express.Router();

userRouter.post('/signup',registerUser);
