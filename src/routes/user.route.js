import express from "express";
import { registerUser, requestEmailVerification, verifyEmail, getInfo, findUsername, getOrderItems, updateUser, updatePassword, updatePasswordEmail, findPassword, removeUser } from "../controllers/user.controller.js";
import { jwtMiddleware } from "../../config/userJwtMiddleWare.js";
import asyncHandler from "express-async-handler";

export const userRouter = express.Router({ mergeParams: true });

userRouter.post('/signup', asyncHandler(registerUser));
userRouter.post('/find-username', asyncHandler(findUsername));
userRouter.post('/email-verification', asyncHandler(requestEmailVerification)); // 회원가입 시 이메일 인증
userRouter.get("/verify-email", asyncHandler(verifyEmail));
userRouter.get('/my-info', jwtMiddleware, asyncHandler(getInfo)); // 개인 정보 가져오기
userRouter.get('/orders', jwtMiddleware, asyncHandler(getOrderItems));
userRouter.patch('', jwtMiddleware, asyncHandler(updateUser)); // pw 를 제외한 유저정보 수정
userRouter.patch('/change-password', jwtMiddleware, asyncHandler(updatePassword)); // pw 수정
userRouter.post('/change-password-email', jwtMiddleware, asyncHandler(updatePasswordEmail)); // pw 수정을 위한 이메일
userRouter.post("/find-password", jwtMiddleware, asyncHandler(findPassword));
userRouter.patch("/status", jwtMiddleware, asyncHandler(removeUser));
