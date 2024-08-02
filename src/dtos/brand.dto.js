// 브랜드 정보 조회
export const brandInfoResponseDTO = (data) => {
    return {"brand": data[0]};
}

// 브랜드 프로필 - 제품 갤러리
export const brandGalleryResponseDTO = (data, currentPage, totalPage) => {

    const products = [];

    for (let i = 0; i < data.length; i++) {
        products.push({
            "product_id": data[i].product_id,
            "subregion_name": data[i].subregion_name,
            "brand_name": data[i].brand_name,
            "product_name": data[i].product_name,
            "discount_rate": data[i].discount_rate,
            "price": data[i].price,
            "thumbnail_url": data[i].thumbnail_url
        })
    }

    return {"products": products, "currentPage": currentPage, "totalPage" : totalPage};
}