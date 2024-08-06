import { selectCommentInfo } from '../models/comment.dao.js';

export const getComment = async(postId)=>{
  return await selectCommentInfo(postId,);
}