import { deleteCommentInfo, addCommentInfo } from '../models/comment.dao.js';
import {BaseError} from "../../config/error.js";
import {status} from "../../config/response.status.js";

export const addComment = async(post_Id, userId, body) =>{
  const postId = post_Id;
  const {parentId, content } = body // 객체 구조분해 할당
  const result = await addCommentInfo(userId, postId, parentId, content);

  if (result === -1) {
    throw new BaseError(status.POST_NOT_FOUND);
  }
}

export const deleteComment = async(commentIds) => {
  const result =await deleteCommentInfo(commentIds);
  if (result === -1) {
    throw new BaseError(status.COMMENT_NOT_FOUND);
  }
}