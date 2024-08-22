import { pool } from "../../config/db.config.js";
import {
    changeOrderStatus, checkEffectiveCount,
    decreasing,
    getOrderInfo,
    increasingStock,
    insertOrderItems,
    insertOrders
} from "./order.sql.js";
import {BaseError} from "../../config/error.js";
import {status} from "../../config/response.status.js";

// 주문 생성
export const createOrder = async (user_id, receiver, address_name, phone, zip_code, address, spec_address, delivery_fee, total_price) => {
    const conn = await pool.getConnection();
    const [result] = await pool.query(insertOrders, [user_id, receiver, address_name, phone, zip_code, address, spec_address, delivery_fee, total_price]);
    conn.release();
    return result.insertId;  // 새로 생성된 주문 ID 반환
};

// 주문 아이템 생성
export const createOrderItem = async (productId, orderId, productOptionId, price, quantity) => {
    const conn = await pool.getConnection();
    const [result] = await pool.query(insertOrderItems, [productId, orderId, productOptionId, price, quantity]);
    console.log(result.insertId);
    conn.release();
};

// 재고 업데이트 (감소)
export const updateStock = async (productOptionId, quantity) => {
    const conn = await pool.getConnection();
    const [result] = await pool.query(decreasing, [quantity, productOptionId]);
    conn.release();
};

// 재고 복구 (취소 시 증가)
export const restoreStock = async (productOptionId, quantity) => {
    const conn = await pool.getConnection();
    const [result] = await pool.query(increasingStock, [quantity, productOptionId]);
    conn.release();
};

// 재고 검증
export const validStockCount = async (productOptionId,quantity)=>{
    const conn = await pool.getConnection();
    const [rows] = await pool.query(checkEffectiveCount,productOptionId);
    const stockCount = rows[0]?.stock || 0;
    console.log(stockCount)
    if(stockCount < quantity ||  stockCount < 0 ){
        return -1 ;
    }
    conn.release();
}


// 주문 상태 업데이트
export const updateOrderStatus = async (orderId, status) => {
    const conn = await pool.getConnection();
    const [result] = await pool.query(changeOrderStatus, [status, orderId]);
    conn.release();
};

// 주문 정보 가져오기
export const getOrder = async (orderId) => {
    const conn = await pool.getConnection();
    const [rows] = await pool.query(getOrderInfo, [orderId]);
    conn.release();
    return rows[0];  // 단일 주문 정보 반환
};