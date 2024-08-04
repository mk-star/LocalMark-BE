import { postLike } from '../controllers/Like.controller';
import express from 'express'; 
import asyncHandler from 'express-async-handler';

export const likeRouter = express.Router({mergeParams: true});

likeRouter.post('/:postId/posts',asyncHandler(postLike))
likeRouter.post('/:commentId/comments')