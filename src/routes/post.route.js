import express from 'express';
import asyncHandler from 'express-async-handler';
import {modifyPost, postDetail, posts, removePost, createPost} from '../controllers/post.controller';
import {upload} from '../proviers/image.provider';

export const postRouter = express.Router({mergeParams: true});

postRouter.get('/', asyncHandler(posts));
postRouter.post('/', upload.array('images', 10), asyncHandler(createPost));
postRouter.get('/:postId', asyncHandler(postDetail));
postRouter.patch('/:postId', upload.array('images', 10), asyncHandler(modifyPost));
postRouter.delete('/:postId', asyncHandler(removePost));

