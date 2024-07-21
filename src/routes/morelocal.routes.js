import express from "express";
import asyncHandler from 'express-async-handler';

import { letterList } from "../controllers/morelocal.controller.js";

export const morelocalRouter = express.Router();

morelocalRouter.get('/letters', asyncHandler(letterList));