import express from "express";
import asyncHandler from "express-async-handler";
import { registerUser, findUsername, getOrderItems, updateUser } from "../controllers/user.controller.js";
import { login, logout } from "../controllers/auth.controller.js";

import { jwtMiddleware } from "../../config/userJwtMiddleWare.js";

export const loginRouter = express.Router();
export const logoutRouter = express.Router();
export const userRouter = express.Router();

loginRouter.post("", asyncHandler(login));

loginRouter.get("/profile", jwtMiddleware, (req, res) => {
  res.json({ message: `로그인한 유저의 아이디: ${req.currentId}` });
});

logoutRouter.post("", asyncHandler(logout));

userRouter.post('/signup', registerUser);
userRouter.post('/find-username', findUsername);
userRouter.get('/:userId/orders', getOrderItems);
userRouter.patch('/:userId', updateUser);
