import { response } from "express";
import { status } from "../../config/response.status.js";
import { addCartItemService } from "../services/cart.service.js";


export const addCartItem = async(req, res) => {

    const productId = req.params.productId;
    console.log(req.body);

    res.send(response(status.SUCCESS, await addCartItemService(req.currentId, req.body, productId)));
}

