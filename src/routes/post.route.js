import { postsPreview } from '../controllers/post.controller';
import { addPost } from '../controllers/post.controller';
import asyncHandler from 'express-async-handler';
import express from 'express'; 

export const postRouter = express.Router({mergeParams: true});
export const postsRouter = express.Router({mergeParams: true});

postsRouter.get('/', postsPreview);
postRouter.post('/signin', asyncHandler(addPost));

