import {createAndJoinChatRoom} from "../services/chat.service.js";
import {response} from "../../config/response.js";
import {status} from "../../config/response.status.js";
import {getChatRoomList, getMessageList} from "../providers/chat.provider.js";

// 채팅 목록 조회
export const chatRoomList = async (req, res, next) =>{
    const userId =req.body.userId;
    return res.send(response(status.SUCCESS,await getChatRoomList(userId)));
}

// 채팅 메시지 조회
export const ChatMessagesList = async (req,res,next) => {
    const { roomId }  = req.params;
    return res.send(response(status.SUCCESS,await getMessageList(roomId)));
}

// 채팅방 생성
export const createChatRoom = async (req, res, next) => {
    const { user1, user2 } = req.body
    return res.send(response(status.SUCCESS,await createAndJoinChatRoom(user1, user2)));
}

