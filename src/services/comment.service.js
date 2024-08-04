import { deleteCommentInfo, addCommentInfo } from '../models/comment.dao';

export const addComment = async(post_Id,body) =>{
  const postId = post_Id;
  const {userId,parentId,content } = body // 객체 비구조화 할당
  console.log(`userId: ${userId}`);
  console.log(`postId: ${postId}`);
  console.log(`parentId: ${parentId}`);
  console.log(`content: ${content}`);
  return await addCommentInfo(userId, postId,parentId,content)
}

export const deleteComment = async(commentIds) => {
  await deleteCommentInfo(commentIds);
}