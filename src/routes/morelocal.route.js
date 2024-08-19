import express from "express";
import asyncHandler from 'express-async-handler';

import { letterList, letterInfo, recentLetters, eventList, eventInfo, recentEvents, addNewLetter, modifyLetter, deleteLetter } from "../controllers/morelocal.controller.js";
import { imageUploader } from "../middleware/image.uploader.js";

export const morelocalRouter = express.Router();

morelocalRouter.get('/letters', asyncHandler(letterList));
morelocalRouter.get('/letters/recent', asyncHandler(recentLetters));
morelocalRouter.get('/letters/:letterId', asyncHandler(letterInfo));
morelocalRouter.post('/letters', imageUploader.array("image", 20), asyncHandler(addNewLetter));   // 생성
morelocalRouter.patch('/letters/:letterId', imageUploader.array("image", 20), asyncHandler(modifyLetter));   // 수정
morelocalRouter.delete('/letters/:letterId', asyncHandler(deleteLetter));   // 삭제

morelocalRouter.get('/events', asyncHandler(eventList));
morelocalRouter.get('/events/recent', asyncHandler(recentEvents));
morelocalRouter.get('/events/:eventId', asyncHandler(eventInfo));
morelocalRouter.post('/events', asyncHandler());   // 생성
morelocalRouter.patch('/events/:eventId', asyncHandler());   // 수정
morelocalRouter.delete('/events/:eventId', asyncHandler());   // 삭제