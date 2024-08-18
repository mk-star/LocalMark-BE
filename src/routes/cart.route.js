import express from "express";
import asyncHandler from 'express-async-handler';
import { jwtMiddleware } from "../../config/userJwtMiddleWare.js";
import { 
 addCartItem, 
 cartItems, 
 deleteCartItem, 
 modifyCartItem } from "../controllers/cart.controller.js";

export const cartRouter = express.Router();

cartRouter.post('/:productId', jwtMiddleware, asyncHandler(addCartItem));
cartRouter.patch('/:cartItemId', asyncHandler(modifyCartItem));
cartRouter.get('/cartItems', jwtMiddleware, asyncHandler(cartItems));
cartRouter.delete('/cartItems',jwtMiddleware, asyncHandler(deleteCartItem));
