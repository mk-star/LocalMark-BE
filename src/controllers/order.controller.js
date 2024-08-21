import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import {cancelOrderInfo, completePaymentInfo, createOrderAndPreparePayment} from "../services/order.service.js";
import {BaseError} from "../../config/error.js";


export async function createOrder(req, res) {
    try {
        res.send(response(status.SUCCESS, await createOrderAndPreparePayment(req.body)));
    } catch (error) {
        console.error('주문 생성 및 결제 준비 오류:', error);
        throw new BaseError
        res.status(500).json({ error: '주문 생성 또는 결제 준비 실패' });
    }
}

