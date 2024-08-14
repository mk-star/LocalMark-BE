import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { 
    addCartItemResponseDTO, 
    cartItemsResponseDTO, 
    modifyCartItemResponseDTO } from "../dtos/cart.dto.js";
import { 
    addCart,
    addCartItemInfo, 
    getCartInfo, 
    getCartItemInfo, 
    getCartItemsInfo, 
    getProductByOption, 
    getProductOption, 
    getProductOptionCombById, 
    getProductPrice, 
    removeCartItem, 
    updateCartItemInfo } from "../models/cart.dao.js";
import { confirmStock } from "../models/stock.dao.js";



export const createCart = async(userId) => {
    try {
        const cartInfo = await addCart(userId);

        return '장바구니 생성 완료'; 
        
    } catch (error) {
        throw error
    }
}


export const addCartItemService = async(userId, body, productId) => {

    try {
        const options = body.options;
        const quantity = body.quantity;
        const optionCombination = Object.entries(options)
                                .map(([key, value]) => `${key}:${value}`)
                                .join(',');
        console.log(optionCombination); 
        // 선택한 상품-옵션 조합 확인
        const productOptionId = await getProductOption(productId, optionCombination);
        // 해당 상품의 재고 확인(옵션별로 재고가 상이함)
        const stockQuantity = await confirmStock(productOptionId);

        // 해당 상품의 재고가 없거나 장바구니 수량보다 적을 경우 error 반환
        if (stockQuantity <= 0 || stockQuantity < quantity) {
            throw new Error("no stock");
        }

        // 재고가 있으면 카트 정보 확인 후 아이템 추가
        const price = await getProductPrice(productId);
        const totalPrice = price * quantity;
        
        // 카트가 생성 되어 있지 않다면 카트 생성
        let cartId = await getCartInfo(userId);
        if (cartId == -1) {
            cartId = await addCart(userId);
        }

        const cartItemId = await addCartItemInfo({cartId, productOptionId, quantity, price, totalPrice});

        return addCartItemResponseDTO(await getCartItemInfo(cartItemId));
    } catch (error) {
        throw error;
    }

}

export const modifyCartItemService = async(cartItemId, body) => {

    try {
        // 수정한 옵션, 수량
        const newOptions = body.options;
        const newQuantity = body.quantity;
        const newOptionCombination = Object.entries(newOptions)
                                            .map(([key, value]) => `${key}:${value}`).join(',');
        
        console.log(newOptionCombination);
        // 수정한 제품 옵션-조합 확인 (새로운 옵션 조합명이 해당 상품의 옵션 조합에 존재하는지 확인)
        const cartItemInfo = await getCartItemInfo(cartItemId);
        console.log(cartItemInfo.product_option_id);
        const productId = await getProductByOption(cartItemInfo.product_option_id);
        console.log(productId);
        const newProductOptionId = await getProductOption(productId, newOptionCombination);

        // 수정한 상품 옵션의 재고 확인
        const stockQuantity = await confirmStock(newProductOptionId);
        
        // 수정한 상품의 재고가 없거나 장바구니 수량보다 적을 경우 error 반환
        if (stockQuantity <= 0 || stockQuantity < newQuantity) {
            throw new Error("no stock");
        }

        const productPirce = cartItemInfo.product_price;
        const totalPrice =  productPirce * newQuantity;
        const cartId = cartItemInfo.cart_id;

        // 장바구니 아이템 수정
        await updateCartItemInfo({cartId, cartItemId, newProductOptionId, newQuantity, totalPrice});

        // 수정한 장바구니 옵션 json 데이터 추가
        const modifyCartItemInfo = await getCartItemInfo(cartItemId);
        modifyCartItemInfo.options = newOptions;
        
        return modifyCartItemResponseDTO(modifyCartItemInfo);
        
    } catch (error) {
        throw error;
    }

}

export const getCartItemsService = async(userId) => {
    
    try {
        const cartId = await getCartInfo(userId);
        const cartItemInfo = await getCartItemsInfo(cartId);

        // 장바구니에 존재하는 장바구니 아이템들 모두 반환
        // 각 상품들의 옵션 json으로 반환
        for (let i = 0; i < cartItemInfo.length; i++) {
            const optionCombination = await getProductOptionCombById(cartItemInfo[i].product_option_id);
            const entries = optionCombination.split(',')
                .map(entry => {
                    const [key, value] = entry.split(':');
                    return [key, value];
                });
            const options = Object.fromEntries(entries);
            cartItemInfo[i].options = options;
        }
    
        return cartItemsResponseDTO(cartItemInfo);
    } catch (error) {
        throw error;
    }

}

export const removeCartItemService = async(userId, body) => {

    try {
        const cartId = await getCartInfo(userId);
        const cartItemIds = body;

        if(cartItemIds && cartItemIds.length > 0) {
            for (const cartItemId of cartItemIds) {
                const result = await removeCartItem(cartId, cartItemId);
                if (result == -1){
                    throw new BaseError(status.CART_ITEM_NOT_EXISTS);
                }
            }
        }

        return { isSuccess: true, message: "선택하신 장바구니 아이템이 성공적으로 삭제되었습니다." };
    } catch (error) {
        throw error;
    }

}