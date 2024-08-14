import express from "express";
import asyncHandler from 'express-async-handler';
import { jwtMiddleware } from "../../config/userJwtMiddleWare.js";

import { brandInfo, brandProductList, brandOrderList } from "../controllers/brand.controller.js";
import { createBrand, updateBrand } from '../controllers/brand.controller.js';

export const brandRouter = express.Router();

brandRouter.post('/', jwtMiddleware, asyncHandler(createBrand));
brandRouter.patch('/:brandId', jwtMiddleware, asyncHandler(updateBrand));

brandRouter.get('/:brandId', asyncHandler(brandInfo));
brandRouter.get('/:brandId/products', asyncHandler(brandProductList));
brandRouter.get('/creator/orders', jwtMiddleware, asyncHandler(brandOrderList));