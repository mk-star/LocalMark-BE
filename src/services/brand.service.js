import { createBrandDAO, updateBrandDAO, getBrandInfoByUserId } from '../models/brand.dao.js';

export const createBrandService = async(userId, brandData)=>{
    // 로그인된 아이디로 브랜드 만들었는지 확인
    const isBrandUser = await getBrandInfoByUserId(userId);
    if (isBrandUser){
        throw new Error('이 사용자는 이미 브랜드가 존재합니다.');
    }
    else{
        const newBrand = await createBrandDAO(userId, brandData);
        return newBrand;
    }
}

export const updateBrandService = async(brandId, userId, brandData) =>{
    const isBrandUser = await getBrandInfoByUserId(userId);
    if(!isBrandUser){
        throw new Error('이 사용자는 브랜드가 없습니다.');
    }
    if(brandId== isBrandUser.id){
        const updatedBrand = await updateBrandDAO(brandId, brandData);
        return updatedBrand;
    }
    else{
        throw new Error('이 사용자는 이 브랜드를 수정할 권한이 없습니다.');
    }
}
