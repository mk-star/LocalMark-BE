import { StatusCodes } from 'http-status-codes';
import { likeService } from '../services/postLike.service';

export const userLike = async(req,res,next)=>{
  // console.log(req.params.postId)
  await likeService(req.params.postId,req.body)
  return res.send(StatusCodes.OK)
}