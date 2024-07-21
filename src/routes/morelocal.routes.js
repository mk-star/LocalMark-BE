import express from "express";
import asyncHandler from 'express-async-handler';

import { letterList, letterInfo, eventList } from "../controllers/morelocal.controller.js";

export const morelocalRouter = express.Router();

morelocalRouter.get('/letters', asyncHandler(letterList));
morelocalRouter.get('/letters/:letterId', asyncHandler(letterInfo));

morelocalRouter.get('/events', asyncHandler(eventList));