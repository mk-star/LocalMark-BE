import express from 'express';
import asyncHandler from 'express-async-handler';
import { modifyPost, postDetail, posts, removePost, uploadPost } from '../controllers/post.controller';
import { upload } from '../proviers/image.provider';

export const postsRouter = express.Router({mergeParams: true});

postsRouter.get('/', asyncHandler(posts));
postsRouter.post('/', upload.array('images', 10), asyncHandler(uploadPost));
postsRouter.get('/:postId', asyncHandler(postDetail));
postsRouter.patch('/:postId', upload.array('images', 10), asyncHandler(modifyPost));
postsRouter.delete('/:postId', asyncHandler(removePost));
