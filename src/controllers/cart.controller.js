import { response } from "express";
import { status } from "../../config/response.status.js";
import { 
    addCartItemService, 
    getCartItemsService, 
    modifyCartItemService, 
    removeCartItemService } from "../services/cart.service.js";


export const addCartItem = async(req, res) => {

    const productId = req.params.productId;
    console.log(req.body);

    res.send(response(status.SUCCESS, 
        await addCartItemService(req.currentId, req.body, productId)));
}

export const modifyCartItem = async(req, res) => {

    const cartItemId = req.params.cartItemId;
    console.log(req.body);

    res.send(response(status.SUCCESS, 
        await modifyCartItemService(cartItemId, req.body)));
}

export const cartItems = async(req, res) => {

    res.send(response(status.SUCCESS, 
        await getCartItemsService(req.currentId)));
}

export const deleteCartItem = async(req, res) => {

    res.send(response(status.SUCCESS, 
        await removeCartItemService(req.currentId, req.body)));
}
