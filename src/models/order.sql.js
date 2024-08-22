export const insertOrders = `
INSERT INTO Orders (user_id, receiver, address_name, phone, zip_code, address, spec_address, delivery_fee, total_price, order_date, status)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), 'WAIT')
`

export const insertOrderItems = `
INSERT INTO Order_Item (product_id, order_id, product_option_id, price, quantity)
VALUES (?, ?, ?, ?, ?)
`

export const increasingStock = `
UPDATE Product_Stock
SET stock = stock + ?
WHERE product_option_id = ?
`

export const decreasing = `
    UPDATE Product_Stock
    SET stock = stock - ?
    WHERE product_option_id = ?
`

export const getOrderInfo = `
SELECT * FROM Orders WHERE id = ?
`

export const changeOrderStatus = `
UPDATE Orders
SET status = ?
WHERE id = ?
`
export const confirmPost =`
SELECT EXISTS(SELECT 1 FROM Orders WHERE id = ? )  as isExistOrder;
`

export const checkEffectiveCount = `
    SELECT stock  FROM Product_Stock WHERE product_option_id = ?
`