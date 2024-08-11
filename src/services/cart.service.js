import { status } from "../../config/response.status.js";
import { 
    addCartItemResponseDTO, 
    cartItemsResponseDTO, 
    modifyCartItemResponseDTO } from "../dtos/cart.dto.js";
import { 
    addCartItemInfo, 
    getCartInfo, 
    getCartItemInfo, 
    getCartItemsInfo, 
    getProductOption, 
    updateCartItemInfo } from "../models/cart.dao.js";
import { getProduct } from "../models/gallery.dao.js";
import { confirmStock } from "../models/stock.dao.js";


export const addCartItemService = async(userId, body, productId) => {

    try {
        const options = body.options;
        const quantity = body.quantity;
        const optionCombination = Object.entries(options).map(([key, value]) => `${key}:${value}`).join(',');

        console.log(optionCombination);

        // 선택한 상품의 옵션-조합 확인
        const productOptionId = await getProductOption(productId, optionCombination);
        // 해당 제품 옵션의 재고 확인
        const stockQuantity = await confirmStock(productOptionId);

        if (stockQuantity < quantity) {
            throw new Error("no stock");
        }

        // 재고가 있으면 카트 정보 확인 후 아이템 추가
        const totalPrice = body.price * quantity;
        const cartId = await getCartInfo(userId);
        const cartItemData = await addCartItemInfo({cartId, productOptionId, quantity, totalPrice});

        return addCartItemResponseDTO(await getCartItemInfo(cartItemData));
    } catch (error) {
        throw err;
    }

}

export const modifyCartItemService = async(cartItemId, body) => {

    try {
        // 수정한 옵션, 수량
        const newOptions = body.options;
        const newQuantity = body.quantity;
        const newOptionCombination = Object.entries(newOptions).map(([key, value]) => `${key}:${value}`).join(',');

        // 기존에 있던 장바구니 아이템 조회
        const productId = body.product_id;
        const productData = await getProduct(productId);
        console.log(productData);
        
        // 수정한 제품 옵션-조합 확인
        const newProductOptionId = await getProductOption(productId, newOptionCombination);
        console.log(newProductOptionId);

        // 해당 제품 옵션의 재고 확인
        const stockQuantity = await confirmStock(newProductOptionId);

        if (stockQuantity <= 0 || stockQuantity < newQuantity) {
            throw new Error("no stock");
        }

        const productPirce = productData.product.price;
        const totalPrice =  productPirce * newQuantity;
        const modifyCartItemData = await updateCartItemInfo({cartItemId, newProductOptionId, newQuantity, totalPrice});

        return modifyCartItemResponseDTO(await getCartItemInfo(modifyCartItemData));
        
    } catch (error) {
        throw err;
    }

}

export const getCartItemsService = async(userId) => {
    
    try {

        const cartId = await getCartInfo(userId);
        return new cartItemsResponseDTO(await getCartItemsInfo(cartId));
        
    } catch (error) {
        throw err;
    }

}

export const removeCartItemService = async(userId, body) => {

    try {

        const cartId = await getCartInfo(userId);
        const cartItemIds = body.cartItemIds;

        if(cartItemIds && cartItemIds.length > 0) {
            for (const cartItemId of cartItemIds) {
                const result = removeCartItem(cartId, cartItemId);

                if (result == -1){
                    throw new BaseError(status.CART_ITEM_NOT_EXISTS);
                }
            }
        }
        
        return '선택한 장바구니 상품이 삭제되었습니다.'
    } catch (error) {
        throw err;
    }

}