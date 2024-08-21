import express from 'express';
import {cancelOrder, completePayment, createOrder} from "../controllers/order.controller.js";
import {jwtMiddleware} from "../../config/userJwtMiddleWare.js";

export const orderRouter = express.Router();

orderRouter.post('/',jwtMiddleware, createOrder);
orderRouter.post('/payment/complete',completePayment);
orderRouter.post('/:orderId/cancel', cancelOrder);


