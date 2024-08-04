import { deleteCommentInfo, addCommentInfo } from '../models/comment.dao';

export const addComment = async(post_Id,body) =>{
  const postId = post_Id;
  const {userId,parentId,content } = body // 객체 비구조화 할당
  const result = await addCommentInfo(userId, postId,parentId,content);
  return result
}

export const deleteComment = async(commentIds) => {
  await deleteCommentInfo(commentIds);
}