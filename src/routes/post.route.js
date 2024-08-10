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

postRouter.post('/signin', asyncHandler(addPost));
postRouter.get('/posts', asyncHandler(posts));
postRouter.post('/', 
    jwtMiddleware,
    imageUploader.array("image", 10), 
    asyncHandler(addPost));
postRouter.get('/:postId', asyncHandler(postDetail));
postRouter.patch('/:postId', 
    jwtMiddleware,
    imageUploader.array("image", 10), 
    asyncHandler(modifyPost));
postRouter.delete('/:postId', asyncHandler(removePost));
postRouter.get('/:brandId/posts', asyncHandler(postsByCreator));
