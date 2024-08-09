import express from "express";
import asyncHandler from 'express-async-handler';
import { addCartItem } from "../controllers/cart.controller.js";
import { jwtMiddleware } from "../../config/userJwtMiddleWare.js";


const cartRouter = express.Router();

cartRouter.post('/:productId', jwtMiddleware, asyncHandler(addCartItem));
