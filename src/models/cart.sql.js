export const confirmProduct = 
"SELECT EXISTS(SELECT 1 FROM product WHERE id = ?) AS isExistProduct;"

export const getProductOptionCombination = 
"SELECT * FROM product_option_combination" +
"WHRER product_id = ? AND option_combination = ?;";

export const getCart =
"SELECT id FROM cart" +
"WHERE user_id = ?;"; 

export const getCartItem =
"SELECT * FROM cart_item" +
"WHERE id = ?;";


export const addCartItem =
"INSERT INTO cart_item (cart_item, product_option_id,  quantity, price) VALUES (?, ?, ?, ?);";

