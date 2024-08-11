import { postLike , commentLike } from '../models/Like.dao.js';
import {BaseError} from "../../config/error.js";
import {status} from "../../config/response.status.js";

export const postLikeService =async (postId,userId) =>{
  const post_id = postId;
  const user_id = userId;
  const result = await postLike(user_id,post_id)
  if(result === -1){
    throw new BaseError(status.POST_NOT_FOUND)
  }
}

export const commentLikeService = async (commentId,userId) => {
  const comment_id = commentId;
  const user_id = userId;
  const result = await commentLike(user_id,comment_id)
  if(result === -1){
    throw new BaseError(status.COMMENT_NOT_FOUND)
  }
}