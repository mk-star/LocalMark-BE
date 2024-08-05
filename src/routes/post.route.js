import {addPost, postsPreview } from '../controllers/post.controller';
import asyncHandler from 'express-async-handler';
import express from 'express';
import multer from 'multer';


// Multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 파일 저장 경로
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // 파일 이름 설정
    }
});

const upload = multer({ storage });
const uploadMiddleware = upload.array("images",10);

export const postRouter = express.Router({mergeParams: true});

postRouter.post('/',uploadMiddleware, asyncHandler(addPost));
postRouter.get('/', postsPreview);


