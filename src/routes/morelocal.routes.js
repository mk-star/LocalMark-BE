import express from "express";
import asyncHandler from 'express-async-handler';

import { letterList, letterInfo, recentLetters, eventList, eventInfo, recentEvents } from "../controllers/morelocal.controller.js";

export const morelocalRouter = express.Router();

morelocalRouter.get('/letters', asyncHandler(letterList));
morelocalRouter.get('/letters/recent', asyncHandler(recentLetters));
morelocalRouter.get('/letters/:letterId', asyncHandler(letterInfo));

morelocalRouter.get('/events', asyncHandler(eventList));
morelocalRouter.get('/events/recent', asyncHandler(recentEvents));
morelocalRouter.get('/events/:eventId', asyncHandler(eventInfo));