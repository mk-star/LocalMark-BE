import { postLike , commentLike } from '../models/Like.dao';

export const postLikeService =async (postId,body) =>{
  const post_id = postId;
  const user_id = body.user_id;
  const result = await postLike(user_id,post_id)
  return result
}

export const commentLikeService = async (commentId,body) => {
  const comment_id = commentId;
  const user_id = body.user_id;
  await commentLike(user_id,comment_id)
}