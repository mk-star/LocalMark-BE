import express from 'express';
import asyncHandler from 'express-async-handler';
import { addPost, postsByCreator } from '../controllers/post.controller.js';
import { modifyPost, postDetail, posts, removePost, uploadPost } from '../controllers/post.controller.js';
import { upload } from '../proviers/image.provider.js';


export const postRouter = express.Router({mergeParams: true});

postRouter.post('/signin', asyncHandler(addPost));
postRouter.get('/posts', asyncHandler(posts));
postRouter.post('/', upload.array('images', 10), asyncHandler(uploadPost));
postRouter.get('/:postId', asyncHandler(postDetail));
postRouter.patch('/:postId', upload.array('images', 10), asyncHandler(modifyPost));
postRouter.delete('/:postId', asyncHandler(removePost));
postRouter.get('/:brandId/posts', asyncHandler(postsByCreator));

