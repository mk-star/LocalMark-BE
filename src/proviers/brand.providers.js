import { status } from "../../config/response.status.js";
import { brandInfoResponseDTO, brandGalleryResponseDTO } from "../dtos/brand.dto.js";
import { getBrandInfos, getBrandGalleryList } from "../models/brand.dao.js";

// 브랜드 정보 조회
export const getBrandInformation = async (brandId) => {
    return brandInfoResponseDTO(await getBrandInfos(brandId));
}

// 브랜드 프로필 - 제품 갤러리
export const getBrandProducts = async (brandId, page, sort) => {

    const result = await getBrandGalleryList(brandId, page, sort)
    return brandGalleryResponseDTO(result.products, result.currentPage, result.totalPage);
}