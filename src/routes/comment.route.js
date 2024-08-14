import asyncHandler from 'express-async-handler';
import express from 'express'; 
import { deleteCommentInfo, getCommentInfo, addCommentInfo } from '../controllers/comment.controller.js';
import { jwtMiddleware } from "../../config/userJwtMiddleWare.js";

export const commentRouter= express.Router();

commentRouter.delete('/:postId/posts', jwtMiddleware, asyncHandler(deleteCommentInfo));
commentRouter.get('/:postId/posts', jwtMiddleware, asyncHandler(getCommentInfo));
commentRouter.post('/:postId/posts', jwtMiddleware, asyncHandler(addCommentInfo));