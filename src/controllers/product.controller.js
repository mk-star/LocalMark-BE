import { BaseError } from "../../config/error.js";
import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import { addProductInfo } from "../services/product.service.js";

export const addProduct = async (req, res, next) => {
  console.log("상품 등록 API");
  console.log(req.currentId);

  try {
    const fileKey = req.file.key;
    res.send(response(status.SUCCESS, await addProductInfo(req.currentId, fileKey)));
  } catch (err) {
    throw new BaseError(status.PRODUCT_FILE_NOT_ATTACHED);
  }
};
