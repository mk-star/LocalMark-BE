import express from "express";
import {ChatMessagesList, chatRoomList, createChatRoom} from "../controllers/chat.controller.js";
import asyncHandler from "express-async-handler";


export const chatRouter = express.Router({mergeParams: true});
chatRouter.get("/", asyncHandler(chatRoomList));
chatRouter.get("/:roomId/messages",asyncHandler(ChatMessagesList));
chatRouter.post("/",asyncHandler(createChatRoom));