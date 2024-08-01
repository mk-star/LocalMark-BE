import express from 'express';
import BrandController from '../controllers/brand.controller.js';

const brandRouter = express.Router();

brandRouter.post('/', BrandController.createBrand);
brandRouter.patch('/:id', BrandController.updateBrand); // login_required 추가

export default brandRouter;
