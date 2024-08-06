import asyncHandler from 'express-async-handler';
import express from 'express'; 
import { deleteCommentInfo, getCommentInfo, addCommentInfo } from '../controllers/comment.controller.js';

export const commentRouter= express.Router();
commentRouter.delete('/:postId/posts',asyncHandler(deleteCommentInfo));
commentRouter.get('/:postId/posts', asyncHandler(getCommentInfo));
commentRouter.post('/:postId/posts', asyncHandler(addCommentInfo));