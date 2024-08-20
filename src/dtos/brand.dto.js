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

// 내 브랜드 주문 수집
export const brandOrderResponseDTO = (data) => {

    const orders = [];

    for (let i = 0; i < data.length; i++) {
        orders.push({
            "order_num": data[i].id,
            "order_date": formatDate(data[i].order_date),
            "product_name": data[i].product_name,
            "options": data[i].product_option_combination,
            "quantity": data[i].quantity,
            "total_price": data[i].total_price,
            "receiver": data[i].receiver,
            "phone": data[i].phone,
            "zip_code": data[i].zip_code,
            "address": data[i].address,
            "spec_address": data[i].spec_address
        })
    }

    return {"orders": orders};
}

export const BrandDto = ({ user_id, region_id, brand_name, brand_category, brand_url, description, brand_image, business_name, business_registration_number, contact }) => ({
    user_id,
    region_id,
    brand_name,
    brand_category,
    brand_url,
    description,
    brand_image,
    business_name,
    business_registration_number,
    contact
});


// 날짜 형식 변경
const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2); 
    return `${year}.${month}.${day}`;
}
