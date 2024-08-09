export const confirmProduct = 
"SELECT EXISTS(SELECT 1 FROM product WHERE id = ?) AS isExistProduct;"

export const confirmCart = 
"SELECT EXISTS(SELECT 1 FROM cart WHERE id = ?) AS isExistCart"

export const confirmCartItem =
"SELECT EXISTS(SELECT 1 FROM cart_item WHERE id = ?) AS isExistCartItem"

export const getProductOptionCombination = 
"SELECT id FROM product_option_combination" +
"WHRER product_id = ? AND option_combination = ?;";

export const getCart =
"SELECT id FROM cart" +
"WHERE user_id = ?;"; 

export const getCartItem =
"SELECT * FROM cart_item" +
"WHERE id = ?;";

export const addCartItem =
"INSERT INTO cart_item (cart_id, product_id, product_option_id, quantity, total_price)" +
"VALUES (?, ?, ?, ?, ?);";

export const updateCartItem = 
"UPDATE cart_item SET product_option_id = ?, quantity = ?, total_price = ? WHERE id = ?;";

export const getCartItems =
"SELECT * FROM cart_item" +
"WHERE cart_id = ?;";

export const deleteCartItemsById = 
"DELETE FROM cart_item" +
"WHERE id = ? and cart_id = ?";