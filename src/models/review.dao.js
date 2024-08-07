import { pool } from "../../config/database.js";
import { status } from "../../config/response.status.js";
import { BaseError } from "../../config/error.js";
import { s3 } from "../middleware/image.uploader.js";
import {
  insertReviewSql,
  selectReviewSql,
  selectReviewByOrderItemSql,
  insertImageSql,
  selectImageSql,
  confirmReview,
  updateReviewSql,
  deleteImageSql,
  deleteReviewSql,
} from "../models/review.sql.js";

export const addReview = async (data) => {
  try {
    const conn = await pool.getConnection();

    const [result] = await pool.query(insertReviewSql, [
      data.userId,
      data.productId,
      data.oiId,
      data.content,
      data.rating,
    ]);

    conn.release();
    return result.insertId;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

export const getReview = async (reviewId) => {
  try {
    const conn = await pool.getConnection();

    const [review] = await pool.query(selectReviewSql, [reviewId]);
    if (review.length == 0) {
      conn.release();
      return -1;
    }

    const [image] = await pool.query(selectImageSql, [reviewId]);

    conn.release();
    return { review, image };
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

export const getReviewByOrderItem = async (oiId) => {
  try {
    const conn = await pool.getConnection();

    console.log(oiId);

    const [review] = await pool.query(selectReviewByOrderItemSql, [oiId]);

    if (review.length == 0) {
      conn.release();
      return -1;
    }

    const [image] = await pool.query(selectImageSql, [review[0].id]);

    conn.release();
    return { review, image };
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

export const saveReviewImages = async (reviewId, imageKey) => {
  try {
    const conn = await pool.getConnection();

    const imageRecords = imageKey.map((key) => {
      const encodedKey = encodeURIComponent(key);
      return [reviewId, encodedKey];
    });

    await pool.query(insertImageSql, [imageRecords]);

    conn.release();
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

export const updateReviewImages = async (reviewId, imageKey) => {
  try {
    const conn = await pool.getConnection();

    console.log(reviewId);

    const [rows] = await pool.query(selectImageSql, [reviewId]);
    const currentImages = rows.map((row) => row.filename);

    console.log(currentImages);

    for (const filename of currentImages) {
      await deleteReviewImages(filename);
    }

    await pool.query(deleteImageSql, [reviewId]);

    if (imageKey && imageKey.length > 0) {
      await saveReviewImages(reviewId, imageKey);
    }

    conn.release();
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

export const deleteReviewImages = async (filename) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: decodeURIComponent(filename),
  };

  try {
    s3.deleteObject(params, function (error, data) {
      if (error) {
        console.log("err: ", error, error.stack);
      } else {
        console.log(data, " 정상 삭제 되었습니다.");
      }
    });
  } catch (err) {
    throw err;
  }
};

export const modifyReviewById = async (data) => {
  try {
    const conn = await pool.getConnection();

    const [confirm] = await pool.query(confirmReview, [data.reviewId]);
    if (!confirm[0].isExistReview) {
      conn.release();
      return -1;
    }

    const [result] = await pool.query(updateReviewSql, [
      data.content,
      data.rating,
      data.reviewId,
    ]);

    conn.release();
    return result.affectedRows;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

export const deleteReviewById = async (reviewId) => {
  try {
    const conn = await pool.getConnection();

    const [confirm] = await pool.query(confirmReview, [reviewId]);
    if (!confirm[0].isExistReview) {
      conn.release();
      return -1;
    }

    const [rows] = await pool.query(selectImageSql, [reviewId]);
    const currentImages = rows.map((row) => row.filename);

    for (const filename of currentImages) {
      await deleteReviewImages(filename);
    }

    const [result] = await pool.query(deleteReviewSql, [reviewId]);

    conn.release();
    return result.affectedRows;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};
