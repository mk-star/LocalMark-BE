export const confirmCart = 
`SELECT EXISTS(SELECT 1 FROM Cart WHERE id = ?) AS isExistCart`

export const confirmCartItem =
`SELECT EXISTS(SELECT 1 FROM Cart_Item WHERE id = ?) AS isExistCartItem`

export const confirmProduct = 
`SELECT EXISTS(SELECT 1 FROM Product WHERE id = ?) AS isExistProduct;`

export const getProductByOptionSql =
`SELECT product_id AS productId FROM Product_Option_Comb WHERE id = ?;`

export const getProductOptionCombination = 
`SELECT id FROM Product_Option_Comb 
WHERE product_id = ? AND product_option_combination = ?;`

export const getProductOptionCombinationById = 
`SELECT product_option_combination AS productOptionComb 
FROM Product_Option_Comb 
WHERE id = ?;`

export const getProductPriceSql = 
`SELECT price FROM Product WHERE id = ?`;

export const getCart =
`SELECT id FROM Cart
WHERE user_id = ?;`

export const addCartInfo =
`INSERT INTO Cart (user_id) VALUES (?);`

export const getCartItem =
`SELECT * FROM Cart_Item
WHERE id = ?;`

export const addCartItem =
`INSERT INTO Cart_Item (cart_id, quantity, product_price, total_price, product_option_id)
VALUES (?, ?, ?, ?, ?);`

export const updateCartItem = 
`UPDATE Cart_Item 
SET quantity = ?, total_price = ?, product_option_id = ? 
WHERE id = ? and cart_id = ?;`

export const getCartItems =
`SELECT * 
FROM Cart_Item
WHERE cart_id = ?;`

export const deleteCartItemsById = 
`DELETE FROM Cart_Item
WHERE id = ? and cart_id = ?;`