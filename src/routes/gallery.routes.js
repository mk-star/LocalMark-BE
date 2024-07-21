import express from "express";
import asyncHandler from 'express-async-handler';
import { galleryProducts, productInfo } from "../controllers/gallery.controller.js";

export const gelleryRouter = express.Router({mergeParams: true});

gelleryRouter.get('/', asyncHandler(galleryProducts));
gelleryRouter.get('/product/:productId', asyncHandler(productInfo));