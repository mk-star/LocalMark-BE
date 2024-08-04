import asyncHandler from 'express-async-handler';
import express from 'express'; 
import { deleteCommentInfo, getCommentInfo, addCommentInfo } from '../controllers/comment.controller';

export const commentRouter= express.Router();
commentRouter.delete('/posts/:postId/comments',asyncHandler(deleteCommentInfo));
commentRouter.get('/posts/:postId', asyncHandler(getCommentInfo));
commentRouter.post('/posts/:postId', asyncHandler(addCommentInfo));