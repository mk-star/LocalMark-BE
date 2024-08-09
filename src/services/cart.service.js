import { addCartItemResponseDTO } from "../dtos/cart.dto.js";
import { 
  addCartItemInfo, 
  getCartInfo, 
  getCartItemInfo, 
  getProductOption} from "../models/cart.dao.js";
import { confirmStock } from "../models/stock.dao.js";

export const addCartItemService = async(userId, body, productId) => {

    try {
        const options = body.options;
        const quantity = body.quantity;
        const optionCombination = Object.entries(options).map(([key, value]) => `${key}:${value}`).join(',');

        console.log(optionCombination);

        // 선택한 상품의 옵션조합 확인
        const productOptionId = await getProductOption(productId, optionCombination);
        // 해당 제품 옵션의 재고 확인
        const stockQuantity = await confirmStock(productOptionId);

        if (stockQuantity < quantity) {
            throw new Error("no stock");
        }

        // 재고가 있으면 카트 정보 확인 후 아이템 추가
        const totalPrice = body.price * quantity;
        const cartId = await getCartInfo(userId, productOptionId);
        const cartItemData = await addCartItemInfo({cartId, productOptionId, quantity, totalPrice});

        return addCartItemResponseDTO(await getCartItemInfo(cartItemData));
    } catch (error) {
        throw err;
    }

}
