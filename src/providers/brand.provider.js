import { status } from "../../config/response.status.js";
import { BaseError } from "../../config/error.js";
import { brandInfoResponseDTO, brandGalleryResponseDTO, brandOrderResponseDTO } from "../dtos/brand.dto.js";
import { getBrandInfos, getBrandGalleryList, getBrandMyOrder } from "../models/brand.dao.js";

// 브랜드 정보 조회
export const getBrandInformation = async (brandId) => {
    const brand = await getBrandInfos(brandId);
    if (brand == -1){
        throw new BaseError(status.BRAND_NOT_EXIST);
    } else {
        return brandInfoResponseDTO(brand);
    }
}

// 브랜드 프로필 - 제품 갤러리
export const getBrandProducts = async (brandId, page, sort) => {

    const result = await getBrandGalleryList(brandId, page, sort);
    if (result == -1){
        throw new BaseError(status.BRAND_NOT_EXIST);
    } else if(result == -2){
        throw new BaseError(status.PAGE_PARAMETER_NOT_EXIST);
    } else {
        return brandGalleryResponseDTO(result.products, result.currentPage, result.totalPage);
    }
}

// 내 브랜드 주문 수집
export const getBrandOrders = async (userId, sort) => {

    const result = await getBrandMyOrder(userId, sort);
    if (result == -1){
        throw new BaseError(status.USER_IS_NOT_CREATOR);
    } else {
        return brandOrderResponseDTO(result);
    }
}