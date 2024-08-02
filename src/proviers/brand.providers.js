import { status } from "../../config/response.status.js";
import { brandInfoResponseDTO } from "../dtos/brand.dto.js";
import { getBrandInfos } from "../models/brand.dao.js";

// 브랜드 정보 조회
export const getBrandInformation = async (brandId) => {
    return brandInfoResponseDTO(await getBrandInfos(brandId));
}