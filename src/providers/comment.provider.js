import { selectCommentInfo } from '../models/comment.dao';

export const getComment = async(postId)=>{
  return await selectCommentInfo(postId,);
}