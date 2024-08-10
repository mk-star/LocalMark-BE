import { pool } from "../../config/database.js"
import { status } from "../../config/response.status.js";
import { 
    addCartItem, 
    confirmCart, 
    confirmCartItem, 
    confirmProduct, 
    deleteCartItemsById, 
    getCart, 
    getCartItem, 
    getCartItems, 
    getProductOptionCombination, 
    updateCartItem } from "./cart.sql.js";


export const getProductOption = async(productId, optionCombination) => {

    try {
        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmProduct, productId);

        if(!confirm[0].isExistProduct) {
            conn.release();
            return -1;
        }

        const [productOptionCombination] = await pool.query(getProductOptionCombination, 
                                                        [productId, optionCombination]);

        return productOptionCombination;
    } catch (error) {

    }


}

export const addCartItemInfo = async(data) =>  {

    try {
        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmCart, data.cartId);

        if(!confirm[0].isExistCart) {
            conn.release();
            return -1;
        }

        const [cartItem] = await pool.query(addCartItem, [data.cartId, data.productOptionId, data.quantity, data.totalPrice]);
        conn.release();

        return cartItem.insertId;
    } catch (error) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }

}

export const updateCartItemInfo = async(data) => {

    try {
       
        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmCart, data.cartId);

        if(!confirm[0].isExistCart) {
            conn.release();
            return -1;
        }

        const [cartItem] = await pool.query(updateCartItem, [data.productOptionId, data.quantity, data.totalPrice, data.cartItemId]);
        conn.release();
        
        return cartItem.affectedRow;
    } catch (error) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getCartInfo = async(userId) => {

    try {
        const conn = await pool.getConnection();

        const [cartId] = await pool.query(getCart, userId);

        conn.release();

        return cartId;
    } catch (error) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }

}

export const getCartItemInfo = async(cartItemId) => {

    try {

        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmCartItem, cartItemId);
        if (!confirm[0].isExistCartItem) {
            conn.release();
            return -1;
        }

        const [cartItemInfo] = await pool.query(getCartItem, cartItemId);
        conn.release();

        return cartItemInfo[0];
    } catch (error) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getCartItemsInfo = async(cartId) => {

    try {
        
        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmCart, data.cartId);

        if(!confirm[0].isExistCart) {
            conn.release();
            return -1;
        }

        const [cartItems] = await pool.query(getCartItems, cartId);
        conn.release();

        return cartItems;
    } catch (error) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const removeCartItem = async(cartId, cartItemId) => {

    try {
        
        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmCartItem, cartItemId);

        if(!confirm[0].isExistCartItem) {
            conn.release();
            return -1;
        }

        const result = await pool.query(deleteCartItemsById, [cartItemId, cartId]);
        
        conn.release();
        
        return result[0].affectedRows;
    } catch (error) {
        
    }
}