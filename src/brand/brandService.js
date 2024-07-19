import { addBrand, getBrand, upBrand } from "./brandDAO";

export const createBrandC = async (body, userId) => {
    const createBrandData = await addBrand({
        'id':body.id,
        'user_id':userId,
        'region_id':body.region_id,
        'name':body.name,
        'brand_url':body.brand_url,
        'description':body.description,
        'brand_image':body.brand_image,
        'business_name':body.business_name,
        'business_registration_number':body.business_registration_number,
        'contact':body.contact,
    });
    // user_id 겹치는지 예외처리 코드 추가
    return getBrand(createBrandData)
}

export const updateBrandC = async (userId, brandId, brandData) =>{
    const brand = await getBrand(brandId);
    if (brand.user_id !== userId) {
        throw new Error('You do not have permission to update this brand.');
    }
    const updatedBrand = await upBrand(brandId, brandData);
    return updatedBrand;
}
