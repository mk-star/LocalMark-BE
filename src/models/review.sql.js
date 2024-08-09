export const insertReviewSql =
  "INSERT INTO Review (user_id, product_id, oi_id, content, rating) VALUES (?, ?, ?, ?, ?)";

export const selectReviewSql = "SELECT * FROM Review WHERE id = ?";

export const selectReviewByOrderItemSql =
  "SELECT * FROM Review WHERE oi_id = ?";

export const insertImageSql =
  "INSERT INTO Review_Image (review_id, filename) VALUES ?";

export const selectImageSql = "SELECT * FROM Review_Image WHERE review_id = ?";

export const deleteImageSql = "DELETE FROM Review_Image WHERE review_id = ?";

export const updateReviewSql =
  "UPDATE Review SET content = ?, rating = ? WHERE id = ?";

export const confirmReview =
  "SELECT EXISTS(SELECT 1 FROM Review WHERE id = ?) as isExistReview";

export const deleteReviewSql = "DELETE FROM Review WHERE id = ?";
