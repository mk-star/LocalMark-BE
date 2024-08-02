import express from "express";
import asyncHandler from 'express-async-handler';

import { brandInfo, brandProductList } from "../controllers/brand.controller.js";

export const brandRouter = express.Router();

brandRouter.get('/:brandId', asyncHandler(brandInfo));
brandRouter.get('/:brandId/products', asyncHandler(brandProductList));