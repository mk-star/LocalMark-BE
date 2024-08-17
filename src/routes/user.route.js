import express from "express";
import { registerUser, verifyEmail, getInfo, findUsername, getOrderItems, updateUser, updatePassword, updatePasswordEmail, findPassword, removeUser } from "../controllers/user.controller.js";
import { jwtMiddleware } from "../../config/userJwtMiddleWare.js";
import asyncHandler from "express-async-handler";

export const userRouter = express.Router();

userRouter.post('/signup', registerUser);
userRouter.post('/find-username', findUsername);
userRouter.get('/verify-email', verifyEmail); // 회원가입시 이메일 인증
userRouter.get('/my-info', jwtMiddleware, getInfo); // 개인 정보 가져오기
userRouter.get('/orders', jwtMiddleware, getOrderItems);
userRouter.patch('', jwtMiddleware, updateUser); // pw 를 제외한 유저정보 수정
userRouter.patch('/change-password', jwtMiddleware, updatePassword); // pw 수정
userRouter.post('/change-password-email', jwtMiddleware, updatePasswordEmail); // pw 수정을 위한 이메일
userRouter.post("/find-password", jwtMiddleware, asyncHandler(findPassword));
userRouter.patch("/status", jwtMiddleware, asyncHandler(removeUser));
