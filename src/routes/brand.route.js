import express from "express";
import asyncHandler from 'express-async-handler';

import { brandInfo } from "../controllers/brand.controller.js";

export const brandRouter = express.Router();

brandRouter.get('/:brandId', asyncHandler(brandInfo));