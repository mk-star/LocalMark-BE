import { postsPreview } from '../controllers/post.controller';
import { addPost } from '../controllers/post.controller';
import asyncHandler from 'express-async-handler';
import express from 'express'; 

export const postRouter = express.Router({mergeParams: true});

postRouter.get('/', postsPreview);
postRouter.post('/', asyncHandler(addPost));

