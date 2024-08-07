import express from "express";
import asyncHandler from "express-async-handler";
import {
  reviewDetail,
  addReview,
  modifyReview,
  deleteReview,
} from "../controllers/review.controller.js";
import { imageUploader } from "../middleware/image.uploader.js";
import { jwtMiddleware } from "../../config/userJwtMiddleWare.js";

export const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.get("/:oiId", asyncHandler(reviewDetail));

reviewRouter.post(
  "/",
  jwtMiddleware,
  imageUploader.array("image", 2),
  asyncHandler(addReview)
);

reviewRouter.patch(
  "/:reviewId",
  jwtMiddleware,
  imageUploader.array("image", 2),
  asyncHandler(modifyReview)
);

reviewRouter.delete("/:reviewId", jwtMiddleware, asyncHandler(deleteReview));
