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

export async function completePayment(req, res) {
    try {
        await completePaymentInfo(req.body);
        res.status(200).json({ message: '결제 완료 및 주문 상태 업데이트 성공' });
    } catch (error) {
        console.error('결제 완료 및 검증 오류:', error);
        res.status(500).json({ error: '결제 완료 또는 검증 실패' });
    }
}


