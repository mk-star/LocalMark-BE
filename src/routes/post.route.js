import express from 'express';
import asyncHandler from 'express-async-handler';
import { 
    modifyPost, 
    postDetail, 
    posts, 
    removePost, 
    addPost,
    postsByCreator } from '../controllers/post.controller.js';
import { imageUploader } from "../middleware/image.uploader.js";


export const postRouter = express.Router({mergeParams: true});

postRouter.get('/', asyncHandler(posts));
postRouter.post('/signin', 
    jwtMiddleware,
    imageUploader.array("image", 10), 
    asyncHandler(addPost));
postRouter.get('/post/:postId', asyncHandler(postDetail));
postRouter.patch('/:postId', 
    jwtMiddleware,
    imageUploader.array("image", 10), 
    asyncHandler(modifyPost));
postRouter.delete('/:postId', asyncHandler(removePost));
postRouter.get('/:brandId/posts', asyncHandler(postsByCreator));

