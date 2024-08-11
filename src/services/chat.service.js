import {createChatRoom} from "../models/chat.dao.js";

export const createAndJoinChatRoom = async(user1, user2) => {
    const newRoom = await createChatRoom(user1,user2);
    return newRoom
}