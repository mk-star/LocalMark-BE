import express from "express";
import asyncHandler from "express-async-handler";
import { login, logout } from "../controllers/user.controller.js";
import { jwtMiddleware } from "../../config/userJwtMiddleWare.js";

export const loginRouter = express.Router();
export const logoutRouter = express.Router();

loginRouter.post("", asyncHandler(login));

loginRouter.get("/profile", jwtMiddleware, (req, res) => {
  res.json({ message: `로그인한 유저의 아이디: ${req.currentId}` });
});

logoutRouter.post("", asyncHandler(logout));
