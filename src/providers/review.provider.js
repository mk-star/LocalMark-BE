import { getReviewByOrderItem } from "../models/review.dao.js";
import { addReviewResponseDTO } from "../dtos/review.dto.js";

export const getReviewDetail = async (oiId) => {
  return addReviewResponseDTO(await getReviewByOrderItem(oiId));
};
