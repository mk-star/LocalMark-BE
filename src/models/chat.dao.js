import { pool } from "../../config/database.js";
import {insertNewMessage, insertNewRoom} from "./chat.sql.js";

export const createChatRoom = async (user1,user2) =>{
    try {
        const conn = await pool.getConnection();
        const [newRoom] = await  pool.query(insertNewRoom,[user1,user2])
        return newRoom.insertId
        conn.release();

    }catch (err) {

    }
}

export const sendMessage = async (roomId,userId,message)=>{
    try {
        const conn = await pool.getConnection();
        const [newMessage] = await pool.query(insertNewMessage, [parseInt(roomId), userId, message]);
        conn.release();
    }catch (err) {
        console.error(`DB 저장 실패: ${err.message}`);
    }
}