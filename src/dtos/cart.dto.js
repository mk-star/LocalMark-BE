export const addCartItemResponseDTO = (cartItem) => {
    return {"cartItem": cartItem};
}

export const modifyCartItemResponseDTO = (cartItem) => {
    return {"cartItem": cartItem};
}

export const cartItemsResponseDTO = (cartItemInfo) => {

    const cartItems = [];

    for (let i = 0; i < cartItemInfo.length; i++) {
        cartItems.push({
            'cartItemId': cartItemInfo[i].id,
            'cartId': cartItemInfo[i].cart_id,
            'quantity': cartItemInfo[i].quantity,
            'totalPrice': cartItemInfo[i].total_price,
            'options': cartItemInfo[i].options
        })
    }

    return {"cartItems" : cartItems};

}