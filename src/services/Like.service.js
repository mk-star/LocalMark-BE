import { postLike } from '../models/Like.dao';

export const postLikeService =async (postId,body) =>{
  const post_id = postId;
  const user_id = body.user_id;
  const result = await postLike(user_id,post_id)
  return result
}