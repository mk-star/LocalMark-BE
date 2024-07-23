import { userLike } from '../controllers/postLike.controller';
import express from 'express'; 
import asyncHandler from 'express-async-handler';

export const likeRouter = express.Router({mergeParams: true});

likeRouter.post('/like/:postId',asyncHandler(userLike))
