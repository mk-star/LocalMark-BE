import { addPost } from '../controllers/post.controller';
import asyncHandler from 'express-async-handler';
import express from 'express'; 

export const postRouter = express.Router();

postRouter.post('/signin', asyncHandler(addPost));