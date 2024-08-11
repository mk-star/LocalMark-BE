export const addCartItemResponseDTO = (cartItem) => {
    return {"cartItem": cartItem};
}

export const modifyCartItemResponseDTO = (cartItem) => {
    return {"cartItem": cartItem};
}

export const cartItemsResponseDTO = (data) => {

    const cartItems = [];

    for (let i = 0; i < data.length; i++) {
        cartItems.push({
            'cart_item_id': data[i].id,
            'cart_id': data[i].cart_id,
            'product_option_id': data[i].product_option_id,
            'quantity': data[i].quantity,
            'total_price': data[i].total_price
        })

    }

    return {"cartItems" : cartItems};

}