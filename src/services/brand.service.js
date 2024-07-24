const BrandDAO = require('../models/brand.dao');
const BrandDto = require('../dtos/brand.dto');

class BrandService {
    static async createBrand(brandData) {
        const createBrandDto = new BrandDto(brandData);
        const newBrand = await BrandDAO.createBrand(createBrandDto);
        return newBrand;
    }
    static async updateBrand(brandId, brandData) {
        const updateBrandDto = new BrandDto(brandData);
        const updatedBrand = await BrandDAO.updateBrand(brandId, updateBrandDto);
        return updatedBrand;
    }
}

module.exports = BrandService;
