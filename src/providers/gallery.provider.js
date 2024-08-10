import { galleryResponseDTO, productResponseDTO } from "../dtos/gallery.dto.js"
import { getGellery, getProduct } from "../models/gallery.dao.js";

export const getProducts = async (query) => {

    const regionId = query.region;
    const categoryId = query.category;
    const page = query.page;
    const sort = query.sort;
    const keyword = query.keyword;

    const result = await getGellery(regionId, categoryId, page, sort, keyword)

    return galleryResponseDTO(result.products, result.currentPage, result.totalPage);
}

export const getProductDetail = async (productId) => {
    const { product, images } = await getProduct(productId);
    return productResponseDTO(product, images);
}