import express from "express";
import {ChatMessagesList, chatRoomList, createChatRoom} from "../controllers/chat.controller.js";


export const chatRouter = express.Router({mergeParams: true});
chatRouter.get("/", chatRoomList);
chatRouter.get("/:roomId/messages",ChatMessagesList);
chatRouter.post("/",createChatRoom)