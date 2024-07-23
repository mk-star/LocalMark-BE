import { userLike } from '../models/postLike.dao';

export const likeService =async (postId,body) =>{
  console.log(body)
  const post_id = postId;
  const user_id = body.user_id;
  const result = await userLike(user_id,post_id)
  return result
}