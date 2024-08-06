import express from "express";
import asyncHandler from "express-async-handler";
import { login, logout } from "../controllers/auth.controller.js";

export const authRouter = express.Router();

authRouter.post("/login", asyncHandler(login));
authRouter.post("/logout", asyncHandler(logout));
