export const galleryResponseDTO = (data, currentPage, totalPage) => {

    const products = [];

    for (let i = 0; i < data.length; i++) {
        products.push({
            'product_id': data[i].product_id,
            'brand_id': data[i].brand_id,
            'subregion_name': data[i].subregion_name,
            'product_name': data[i].product_name,
            'brand_name': data[i].brand_name,
            'discount_rate': data[i].discount_rate,
            'price': data[i].price,
            'thumbnail_url' : data[i].thumbnail_url
        })
    }
    return {"products": products, "currentPage": currentPage, "totalPage" : totalPage};
}

export const productResponseDTO = (product, images) => {

    return {product, images };
}