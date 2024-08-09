import express from "express";
import asyncHandler from "express-async-handler";
import { registerGeneral, registerCreator, findUsername, getOrderItems, updateUser, updatePassword, updatePasswordEmail } from "../controllers/user.controller.js";
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

userRouter.post('/signup/creator', registerCreator);
userRouter.post('/signup/general', registerGeneral);
userRouter.post('/find-username', findUsername);
userRouter.get('/:userId/orders', jwtMiddleware, getOrderItems);
userRouter.patch('/:userId', jwtMiddleware, updateUser); // pw 를 제외한 유저정보 수정
userRouter.patch('/:userId/change-password', jwtMiddleware, updatePassword); // pw 수정
userRouter.post('/:userId/change-password-email', jwtMiddleware, updatePasswordEmail); // pw 수정을 위한 이메일
