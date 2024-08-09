import {createChatRoom} from "../models/chat.dao.js";

export const getChatRoomList = async() => {

}

export const getMessages = async (chatRoomId) =>{

}

export const createAndJoinChatRoom = async(user1, user2) => {
    const newRoom = await createChatRoom(user1,user2);
    return newRoom
}