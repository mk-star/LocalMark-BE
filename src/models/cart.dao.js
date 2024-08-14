import { pool } from "../../config/db.config.js";
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { 
    addCartInfo,
    addCartItem, 
    confirmCart, 
    confirmCartItem, 
    confirmProduct, 
    deleteCartItemsById, 
    getCart, 
    getCartItem, 
    getCartItems,  
    getProductByOptionSql,  
    getProductOptionCombination, 
    getProductOptionCombinationById, 
    getProductPriceSql, 
    updateCartItem } from "./cart.sql.js";


export const getProductByOption = async(productOptionId) => {
        
    try{       
            const conn = await pool.getConnection();

            const [productId] = await pool.query(getProductByOptionSql, [productOptionId]);
            conn.release();

            return productId[0].productId;
    } catch (error) {
            throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getProductPrice = async(productId) => {
    
    try {
        const conn = await pool.getConnection();

        const [product] = await pool.query(getProductPriceSql, [productId]);
        conn.release();

        const price = product[0].price;

        return price;
    } catch (error) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}


export const getProductOptionCombById = async(productOptionCombId) => {
   
    try {
        const conn = await pool.getConnection();
        const [result] = await pool.query(getProductOptionCombinationById, 
                                                [productOptionCombId]);

        conn.release();

        return result[0].productOptionComb;       
    } catch (error) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}


export const getProductOption = async(productId, optionCombination) => {

    try {
        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmProduct, [productId]);

        if(!confirm[0].isExistProduct) {
            conn.release();
            return -1;
        }

        const [result] = await pool.query(getProductOptionCombination, 
                                                [productId, optionCombination]);

        const productOptionCombId = result[0].id;

        return productOptionCombId;
    } catch (error) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }


}

export const addCartItemInfo = async(data) =>  {

    try {
        const conn = await pool.getConnection();

        console.log(data.cartId, data.quantity, data.totalPrice, data.productOptionId);

        const [confirm] = await pool.query(confirmCart, [data.cartId]);

        if(!confirm[0].isExistCart) {
            conn.release();
            return -1;
        }

        const [cartItem] = await pool.query(addCartItem, [data.cartId, 
                                                          data.quantity, 
                                                          data.price, 
                                                          data.totalPrice, 
                                                          data.productOptionId]);
        
        conn.release();

        return cartItem.insertId;
    } catch (error) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }

}

export const updateCartItemInfo = async(data) => {

    try {
        const conn = await pool.getConnection();

        const [cartItem] = await pool.query(updateCartItem, [data.newQuantity, 
                                                            data.totalPrice, 
                                                            data.newProductOptionId, 
                                                            data.cartItemId,
                                                            data.cartId]);
        conn.release();
        
        return cartItem.affectedRows;
    } catch (error) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const addCart = async(userId) => {
    try {

        const conn = await pool.getConnection();

        const [result] = await pool.query(addCartInfo, [userId]);
        conn.release();

        return result.insertId;
    } catch (error) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getCartInfo = async(userId) => {

    try {
        const conn = await pool.getConnection();

        console.log(userId);

        const [result] = await pool.query(getCart, [userId]);

        if(result.length === 0) {
            conn.release();
            return -1;
        }

        conn.release();

        return result[0].id;
    } catch (error) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }

}


export const getCartItemInfo = async(cartItemId) => {

    try {

        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmCartItem, [cartItemId]);
        if (!confirm[0].isExistCartItem) {
            conn.release();
            return -1;
        }

        const [cartItemInfo] = await pool.query(getCartItem, [cartItemId]);
        conn.release();

        return cartItemInfo[0];
    } catch (error) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const getCartItemsInfo = async(cartId) => {

    try {
        
        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmCart, [cartId]);

        if(!confirm[0].isExistCart) {
            conn.release();
            return -1;
        }

        const [cartItems] = await pool.query(getCartItems, [cartId]);
        conn.release();

        return cartItems;
    } catch (error) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}


export const removeCartItem = async(cartId, cartItemId) => {

    try {
        
        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmCartItem, [cartItemId]);

        if(!confirm[0].isExistCartItem) {
            conn.release();
            return -1;
        }

        const [result] = await pool.query(deleteCartItemsById, [cartItemId, cartId]);
        conn.release();
        
        return result.affectedRows;
    } catch (error) {
        
    }
}