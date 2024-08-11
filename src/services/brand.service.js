import { createBrandDAO, updateBrandDAO } from '../models/brand.dao.js';
import { BrandDto } from '../dtos/brand.dto.js';

export const createBrandService = async(brandData)=>{
    const newBrand = await createBrandDAO(brandData);
    return newBrand;
}

export const updateBrandService = async(brandId, brandData) =>{
    const updatedBrand = await updateBrandDAO(brandId, brandData);
    return updatedBrand;
}
