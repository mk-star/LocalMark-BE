import express from "express";
import asyncHandler from 'express-async-handler';
import { jwtMiddleware } from "../../config/userJwtMiddleWare.js";
import { imageUploader } from "../middleware/image.uploader.js";

import { brandInfo, brandProductList, brandOrderList } from "../controllers/brand.controller.js";
import { createBrand, updateBrand } from '../controllers/brand.controller.js';

export const brandRouter = express.Router({mergeParams: true});

brandRouter.post('/',
    jwtMiddleware,
    imageUploader.single('brand_image'),
    asyncHandler(createBrand));
brandRouter.patch('/:brandId',
    jwtMiddleware,
    imageUploader.single('brand_image'),
    asyncHandler(updateBrand));

brandRouter.get('/:brandId', asyncHandler(brandInfo));
brandRouter.get('/:brandId/products', asyncHandler(brandProductList));
brandRouter.get('/creator/orders', jwtMiddleware, asyncHandler(brandOrderList));
