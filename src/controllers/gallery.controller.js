import { response } from "../../config/response.js";

import { getProducts, getProductDetail } from "../providers/gallery.provider.js";
import { status } from "../../config/response.status.js";

export const galleryProducts = async (req, res, next) => {
    console.log("갤러리 제품을 요청하였습니다!");
    console.log("query:", req.query); // 값이 잘 들어오나 찍어보기 위한 테스트 용

    return res.send(response(status.SUCCESS, await getProducts(req.query)));
}

export const productInfo = async (req, res, next) => {
    console.log("갤러리 제품 상세 정보를 요청하였습니다!");
    console.log("params:", req.params); // 값이 잘 들어오나 찍어보기 위한 테스트 용

    return res.send(response(status.SUCCESS, await getProductDetail(req.params.productId)));
}