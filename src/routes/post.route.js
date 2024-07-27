import express from 'express';
import asyncHandler from 'express-async-handler';
import { postDetail, posts } from '../controllers/post.controller';

export const postsRouter = express.Router({mergeParams: true});

postsRouter.get('/', asyncHandler(posts));
postsRouter.get('/:postId', asyncHandler(postDetail));
