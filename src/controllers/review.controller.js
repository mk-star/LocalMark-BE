import { response } from "../../config/response.js";
import { status } from "../../config/response.status.js";
import {
  addReviewInfo,
  modifyReviewInfo,
  removePost,
} from "../services/review.service.js";
import { getReviewDetail } from "../providers/review.provider.js";

export const reviewDetail = async (req, res, next) => {
  console.log("리뷰 조회 요청입니다.");

  res.send(response(status.SUCCESS, await getReviewDetail(req.params.oiId)));
};

export const addReview = async (req, res, next) => {
  console.log("리뷰 작성 요청입니다.");
  console.log("body", req.body);
  const reviewImage = req.files;

  const imageKey = [];
  if (reviewImage) {
    reviewImage.forEach((v) => {
      imageKey.push(v.key);
    });
  }

  res.send(
    response(
      status.SUCCESS,
      await addReviewInfo(req.currentId, req.body, imageKey)
    )
  );
};

export const modifyReview = async (req, res, next) => {
  console.log("리뷰 수정 요청입니다.");

  const reviewImage = req.files;

  const imageKey = [];
  if (reviewImage) {
    reviewImage.forEach((v) => {
      imageKey.push(v.key);
    });
  }

  res.send(
    response(
      status.SUCCESS,
      await modifyReviewInfo(req.params.reviewId, req.body, imageKey)
    )
  );
};
export const deleteReview = async (req, res, next) => {
  console.log("리뷰 삭제 요청입니다.");

  res.send(response(status.SUCCESS, await removePost(req.params.reviewId)));
};
