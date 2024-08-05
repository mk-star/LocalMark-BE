import { postLike , commentLike } from '../models/Like.dao';
import {BaseError} from "../../config/error.js";
import {status} from "../../config/response.status";

export const postLikeService =async (postId,body) =>{
  const post_id = postId;
  const user_id = body.user_id;
  const result = await postLike(user_id,post_id)
  if(result === -1){
    throw new BaseError(status.POST_NOT_FOUND)
  }
}

export const commentLikeService = async (commentId,body) => {
  const comment_id = commentId;
  const user_id = body.user_id;
  const result = await commentLike(user_id,comment_id)
  if(result === -1){
    throw new BaseError(status.COMMENT_NOT_FOUND)
  }
}