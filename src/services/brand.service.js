import { createBrandDAO, updateBrandDAO } from '../models/brand.dao.js';
import { BrandDto } from '../dtos/brand.dto.js';

export const createBrandService = async(brandData)=>{
    const createBrandDto = new BrandDto(brandData);
    const newBrand = await createBrandDAO(createBrandDto);
    return newBrand;
}

export const updateBrandService = async(brandId, brandData) =>{
    const updateBrandDto = new BrandDto(brandData);
    const updatedBrand = await updateBrandDAO(brandId, updateBrandDto);
    return updatedBrand;
}
