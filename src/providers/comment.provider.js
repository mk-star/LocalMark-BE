import { selectCommentInfo } from '../models/comment.dao.js';
import {BaseError} from "../../config/error.js";
import {status} from "../../config/response.status.js";
import {CommentTreeDTO} from "../dtos/comment.dto.js";

export const getComment = async(postId)=>{
  const result = CommentTreeDTO(await selectCommentInfo(postId));
  if(result === -1){
    throw new BaseError(status.POST_NOT_FOUND)
  }
  return result;
}