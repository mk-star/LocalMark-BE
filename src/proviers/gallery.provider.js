import { galleryResponseDTO } from "../dtos/gallery.dto"
import { getGellery } from "../models/gallery.dao";

export const getProducts = async (query) => {

    const regionId = query.region_id;
    const categoryId = query.category_id;
    const page = query.page;
    const keyword = query.keyword;

    const result = await getGellery(regionId, categoryId, page, keyword)

    return galleryResponseDTO(result.products, result.currentPage, result.totalPage);
}