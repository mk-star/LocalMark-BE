import { addPostInfo } from '../services/post.service'
import { StatusCodes } from 'http-status-codes';

export const addPost = async(req,res,next)=>{
  await addPostInfo(req.body)
  return res.send(StatusCodes.OK)
}
