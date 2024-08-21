import axios from 'axios';
import {
    createOrder,
    createOrderItem,
    getOrder,
    restoreStock,
    updateOrderStatus,
    updateStock
} from "../models/oreder.dao.js";

// 아임포트 인증 토큰 발급 함수
async function getIamportToken() {
    const url = "https://api.iamport.kr/users/getToken";
    const data = {
        imp_key:  process.env.IMP_KEY ,
        imp_secret:  process.env.IMP_SECRET
    };

    try {
        const result = await axios.post(url, data);
        console.log("아임포트 생성 토큰",result.data.response.access_token )
        return result.data.response.access_token;
    } catch (error) {
        console.error("아임포트 토큰 발급 실패:", error);
        throw error;
    }
}

// 주문 생성 및 결제 준비 서비스
export async function createOrderAndPreparePayment(orderData) {
    const { user_id, receiver, address_name, phone, zip_code, address, spec_address, delivery_fee, total_price, order_items } = orderData;


    // 주문 정보 저장
    const newOrder = await createOrder(
        user_id,
        receiver,
        address_name,
        phone,
        zip_code,
        address,
        spec_address,
        delivery_fee,
        total_price,
    );


    // 주문 아이템 저장
    for (const item of order_items) {
        await createOrderItem(
            item.product_id,
            newOrder,
            item.product_option_id,
            item.price,
            item.quantity
        );
    }

    // 재고 감소
    for (const item of order_items) {
        await updateStock(item.product_option_id, item.quantity);
    }

    // 아임포트 토큰 발급
    const accessToken = await getIamportToken();

    // 결제 준비 요청 (카카오페이)
    const paymentData = {
        merchant_uid: `order_${newOrder}_${new Date().getTime()}`,
        amount: total_price,
        buyer_name: receiver,
        buyer_tel: phone,
        buyer_addr: address,
        name: '주문 결제'
    };

    const iamportResponse = await axios.post(
        "https://api.iamport.kr/payments/prepare",
        paymentData,
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (iamportResponse.data.code !== 0) {
        throw new Error(iamportResponse.data.message);
    }

    const { imp_uid } = iamportResponse.data.response;
    console.log(iamportResponse.data);

    return { order: newOrder, imp_uid, paymentData };
}

// 결제 완료 및 검증 서비스
export async function completePaymentInfo(paymentInfo) {
    const { imp_uid, merchant_uid, order_id } = paymentInfo;

    const accessToken = await getIamportToken();

    // 결제 검증
    const iamportResponse = await axios.get(`https://api.iamport.kr/payments/${imp_uid}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    const payment = iamportResponse.data.response;
    if (payment.status !== 'paid') {
        throw new Error('결제 실패');
    }

    // 주문 상태 업데이트
    await updateOrderStatus(order_id, 'COMPLETE');
}

// 주문 취소 서비스
export async function cancelOrderInfo(order_id, reason) {
    // 주문 정보 가져오기
    const order = await getOrder(order_id);
    if (!order) {
        throw new Error('주문을 찾을 수 없습니다.');
    }

    // 재고 복구
    const orderItems = await getOrder(order_id);
    for (const item of orderItems) {
        await restoreStock(item.product_option_id, item.quantity);
    }

    // 결제 취소 요청 (아임포트)
    const accessToken = await getIamportToken();
    await axios.post(
        `https://api.iamport.kr/payments/cancel`,
        {
            imp_uid: order.imp_uid,
            merchant_uid: order.merchant_uid,
            reason
        },
        {headers: {Authorization: `Bearer ${accessToken}`}}
    );

    // 주문 상태 업데이트
    await updateOrderStatus(order_id, 'CANCEL')
}