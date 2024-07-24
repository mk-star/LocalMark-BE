import express from 'express';
import { postsPreview } from '../controllers/post.controller';


export const postRouter = express.Router({mergeParams: true});
export const postsRouter = express.Router({mergeParams: true});

postsRouter.get('/', postsPreview);