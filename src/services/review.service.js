import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import {
  addReview,
  getReview,
  saveReviewImages,
  updateReviewImages,
  modifyReviewById,
  deleteReviewById,
} from "../models/review.dao.js";
import {
  addReviewResponseDTO,
  modifyReviewResponseDTO,
} from "../dtos/review.dto.js";

export const addReviewInfo = async (userId, body, imageKey) => {
  try {
    const reviewData = await addReview({
      userId: userId,
      productId: body.product_id,
      oiId: body.oi_id,
      content: body.content,
      rating: body.rating,
    });

    if (imageKey && imageKey.length > 0) {
      await saveReviewImages(reviewData, imageKey);
    }

    return addReviewResponseDTO(await getReview(reviewData));
  } catch (err) {
    throw err;
  }
};

export const modifyReviewInfo = async (reviewId, body, imageKey) => {
  try {
    await modifyReviewById({
      reviewId: reviewId,
      content: body.content,
      rating: body.rating,
    });

    await updateReviewImages(reviewId, imageKey);

    return modifyReviewResponseDTO(await getReview(reviewId));
  } catch (err) {
    throw err;
  }
};

export const removePost = async (reviewId) => {
  const result = await deleteReviewById(reviewId);

  if (result == -1) {
    throw new BaseError(status.REVIEW_NOT_EXISTS);
  }

  return "리뷰가 성공적으로 삭제되었습니다.";
};
