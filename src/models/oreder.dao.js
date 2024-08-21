import { pool } from "../../config/db.config.js";

// 주문 생성
export const createOrder = async (user_id, receiver, address_name, phone, zip_code, address, spec_address, delivery_fee, total_price) => {
    const query = `
        INSERT INTO Orders (user_id, receiver, address_name, phone, zip_code, address, spec_address, delivery_fee, total_price, order_date, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 'WAIT')
    `;
    const [result] = await pool.execute(query, [user_id, receiver, address_name, phone, zip_code, address, spec_address, delivery_fee, total_price]);
    return result.insertId;  // 새로 생성된 주문 ID 반환
};

// 주문 아이템 생성
export const createOrderItem = async (order_id, product_id, product_option_id, price, quantity) => {
    const query = `
        INSERT INTO Order_Item (product_id, order_id, product_option_id, price, quantity)
        VALUES (?, ?, ?, ?, ?)
    `;
    const [result] =await pool.execute(query, [product_id, order_id, product_option_id, price, quantity]);
    console.log(result.insertId);
};

// 재고 업데이트 (감소)
export const updateStock = async (product_option_id, quantity) => {
    const query = `
        UPDATE Product_Stock
        SET stock = stock - ?
        WHERE product_option_id = ?
    `;
    await pool.execute(query, [quantity, product_option_id]);
};

// 재고 복구 (취소 시 증가)
export const restoreStock = async (product_option_id, quantity) => {
    const query = `
        UPDATE Product_Stock
        SET stock = stock + ?
        WHERE product_option_id = ?
    `;
    await pool.execute(query, [quantity, product_option_id]);
};

// 주문 상태 업데이트
export const updateOrderStatus = async (order_id, status) => {
    const query = `
        UPDATE Orders
        SET status = ?
        WHERE id = ?
    `;
    await pool.execute(query, [status, order_id]);
};

// 주문 정보 가져오기
export const getOrder = async (order_id) => {
    const query = `
        SELECT * FROM Orders WHERE id = ?
    `;
    const [rows] = await pool.execute(query, [order_id]);
    return rows[0];  // 단일 주문 정보 반환
};