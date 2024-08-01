import BrandService from '../services/brand.service.js';
import { response, errResponse } from '../../config/response.js';

class BrandController {
    static async createBrand(req, res) {
        try {
            const brandData = req.body;
            // brandData.user_id = req.userId;
            brandData.user_id = 1; // Replace with actual user ID logic
            const newBrand = await BrandService.createBrand(brandData);
            return res.status(201).json(response({ isSuccess: true, code: 201, message: 'Brand created successfully' }, newBrand));
        } catch (error) {
            return res.status(400).json(errResponse({ isSuccess: false, code: 400, message: error.message }));
        }
    }

    static async updateBrand(req, res) {
        try {
            const brandId = req.params.id;
            const brandData = req.body;
            // brandData.user_id = req.userId;
            brandData.user_id = 1; // Replace with actual user ID logic
            const updatedBrand = await BrandService.updateBrand(brandId, brandData);
            return res.status(200).json(response({ isSuccess: true, code: 200, message: 'Brand updated successfully' }, updatedBrand));
        } catch (error) {
            return res.status(400).json(errResponse({ isSuccess: false, code: 400, message: error.message }));
        }
    }
}

export default BrandController;
