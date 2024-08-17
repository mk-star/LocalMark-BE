import { deleteComment, addComment } from '../services/comment.service.js';
import { getComment } from '../providers/comment.provider.js';
import {status} from "../../config/response.status.js";
import { response } from "../../config/response.js";

export const deleteCommentInfo = async(req,res,next)=>{
  const { postId } = req.params;
  const commentIds = req.query.ids ? req.query.ids.split(',').map(Number) : [];
  res.send(response(status.SUCCESS,await deleteComment(commentIds)));
}

export const getCommentInfo = async(req,res,next) =>{
  const postId = req.params.postId;
  res.send(response(status.SUCCESS, await getComment(postId)));
}

export const addCommentInfo = async(req,res,next)=>{
  const postId = req.params.postId;
  const userId = req.currentId;
  res.send(response(status.SUCCESS, await addComment(postId, userId, req.body)));
}