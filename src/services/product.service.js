import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { saveProductFiles, getProduct} from "../models/product.dao.js";
import { addProductResponseDTO } from "../dtos/product.dto.js";

export const addProductInfo = async (userId, fileKey) => {
    const productData = await saveProductFiles(userId, fileKey);
    return addProductResponseDTO(await getProduct(productData));
};
