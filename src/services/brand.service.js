import { createBrand, updateBrand } from '../models/brand.dao.js';
import BrandDto from '../dtos/brand.dto.js';

export const createBrand = async(brandData)=>{
    const createBrandDto = new BrandDto(brandData);
    const newBrand = await createBrand(createBrandDto);
    return newBrand;
}

export const updateBrand = async(brandId, brandData) =>{
    const updateBrandDto = new BrandDto(brandData);
    const updatedBrand = await updateBrand(brandId, updateBrandDto);
    return updatedBrand;
}
