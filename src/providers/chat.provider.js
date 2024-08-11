import {getChatRooms, getMessages} from "../models/chat.dao.js";

export const getChatRoomList = async(userId) => {
    // type = 판매자, 구매자 식별

    return await getChatRooms(userId);
}

export const getMessageList = async (chatRoomId) =>{
    return await getMessages(chatRoomId);
}