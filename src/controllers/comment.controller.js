import express from 'express';
import { deleteComment, addComment } from '../services/comment.service';
import { getComment } from '../providers/comment.provider';

export const deleteCommentInfo = async(req,res,next)=>{
  const { postId } = req.params;
  const commentIds = req.query.ids ? req.query.ids.split(',').map(Number) : [];
  await deleteComment(commentIds);
}

export const getCommentInfo = async(req,res,next) =>{
  const postId = req.params;
  res.send(await getComment(postId));
}

export const addCommentInfo = async(req,res,next)=>{
  const postId = req.params.postId;
  await addComment(postId,req.body);
  res.send("ok")
}