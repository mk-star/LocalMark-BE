import { deleteComment, addComment } from '../services/comment.service';
import { getComment } from '../providers/comment.providers';
import {status} from "../../config/response.status";

export const deleteCommentInfo = async(req,res,next)=>{
  const { postId } = req.params;
  const commentIds = req.query.ids ? req.query.ids.split(',').map(Number) : [];
  res.send(response(status.SUCCESS,await deleteComment(commentIds)));
}

export const getCommentInfo = async(req,res,next) =>{
  const postId = req.params;
  res.send(response(status.SUCCESS, await getComment(postId)));
}

export const addCommentInfo = async(req,res,next)=>{
  const postId = req.params.postId;
  res.send(response(status.SUCCESS, await addComment(postId,req.body)));
}