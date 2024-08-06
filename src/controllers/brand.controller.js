import { createBrandService, updateBrandService } from '../services/brand.service.js';
import { response, errResponse } from '../../config/response.js';

export const createBrand = async(req, res, next) => {
    try {
        const brandData = req.body;
        // brandData.user_id = req.userId;
        brandData.user_id = 1; // Replace with actual user ID logic
        const newBrand = await createBrandService(brandData);
        return res.status(201).json(response({ isSuccess: true, code: 201, message: 'Brand created successfully' }, newBrand));
    } catch (error) {
        return res.status(400).json(errResponse({ isSuccess: false, code: 400, message: error.message }));
    }
}
export const updateBrand = async(req, res, next) => {
    try {
        const brandId = req.params.id;
        const brandData = req.body;
        // brandData.user_id = req.userId;
        brandData.user_id = 1; // Replace with actual user ID logic
        const updatedBrand = await updateBrandService(brandId, brandData);
        return res.status(200).json(response({ isSuccess: true, code: 200, message: 'Brand updated successfully' }, updatedBrand));
    } catch (error) {
        return res.status(400).json(errResponse({ isSuccess: false, code: 400, message: error.message }));
    }
}
