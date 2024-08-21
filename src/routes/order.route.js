import express from 'express';
import {cancelOrder, completePayment, createOrder} from "../controllers/order.controller.js";

export const orderRouter = express.Router();

orderRouter.post('/', createOrder);
orderRouter.post('/payment/complete', completePayment);
orderRouter.post('/:orderId/cancel', cancelOrder);


