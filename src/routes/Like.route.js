import { postLike, commentLike } from '../controllers/Like.controller.js';
import express from 'express'; 
import asyncHandler from 'express-async-handler';
import {jwtMiddleware} from "../../config/userJwtMiddleWare.js";

export const likeRouter = express.Router({mergeParams: true});

likeRouter.post('/:postId/posts',jwtMiddleware,asyncHandler(postLike))
likeRouter.post('/:commentId/comments',jwtMiddleware, asyncHandler(commentLike))