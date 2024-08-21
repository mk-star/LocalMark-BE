import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import {cancelOrderInfo, completePaymentInfo, createOrderAndPreparePayment} from "../services/order.service.js";
import {BaseError} from "../../config/error.js";


export async function createOrder(req, res) {
    res.send(response(status.SUCCESS, await createOrderAndPreparePayment(req.currentId, req.body)));
}

export async function completePayment(req, res) {
    try {
        res.send(response(status.SUCCESS,await completePaymentInfo(req.body)));
    } catch (error) {
        console.error('결제 완료 및 검증 오류:', error);
        res.status(500).json({ error: '결제 완료 또는 검증 실패' });
    }
}

export async function cancelOrder(req, res) {
    const { orderId } = req.params;
    try {
        res.send(response(status.SUCCESS,await cancelOrderInfo(orderId, req.body.reason)));
    } catch (error) {
        console.error('주문 취소 오류:', error);
        res.status(500).json({ error: '주문 취소 실패' });
    }
}
