import express from "express";
import asyncHandler from "express-async-handler";
import { jwtMiddleware } from "../../config/userJwtMiddleWare.js";
import { imageUploader } from "../middleware/image.uploader.js";
import { addProduct } from "../controllers/product.controller.js";

export const productRouter = express.Router({ mergeParams: true });

productRouter.post("", jwtMiddleware, imageUploader.single("file"), asyncHandler(addProduct));