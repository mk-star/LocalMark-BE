import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";

import { getBrandInformation } from "../proviers/brand.providers.js";

// 브랜드 정보 조회
export const brandInfo = async (req, res, next) => {
    console.log("브랜드 정보를 요청하였습니다!");
    console.log("params:", req.params); // 값이 잘 들어오나 찍어보기 위한 테스트 용

    return res.send(response(status.SUCCESS, await getBrandInformation(req.params.brandId)));
}