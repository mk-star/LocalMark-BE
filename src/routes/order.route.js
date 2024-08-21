import express from 'express';
import {cancelOrder, completePayment, createOrder} from "../controllers/order.controller.js";
import {jwtMiddleware} from "../../config/userJwtMiddleWare.js";
import asyncHandler from "express-async-handler";

export const orderRouter = express.Router();

orderRouter.post('/',jwtMiddleware, asyncHandler(createOrder));
orderRouter.post('/payment/complete',asyncHandler(completePayment));
orderRouter.post('/:orderId/cancel', asyncHandler(cancelOrder));


