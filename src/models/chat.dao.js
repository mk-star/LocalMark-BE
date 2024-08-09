import { pool } from "../../config/database.js";
import {getMessageAll, getRoomAll, insertNewMessage, insertNewRoom} from "./chat.sql.js";

export const createChatRoom = async (user1,user2) =>{
    try {
        const conn = await pool.getConnection();
        const [newRoom] = await  pool.query(insertNewRoom,[user1,user2])
        conn.release();
        return newRoom.insertId;
    }catch (err) {

    }
}

export const sendMessage = async (roomId,userId,message)=>{
    try {
        const conn = await pool.getConnection();
        await pool.query(insertNewMessage, [parseInt(roomId), userId, message]);
        conn.release();
    }catch (err) {
        console.error(`DB 저장 실패: ${err.message}`);
    }
}

export const getChatRooms = async (userId) =>{
    try {
        const conn = await pool.getConnection();
        const [result] = await pool.query(getRoomAll,[userId,null]);
        conn.release();

        return result;
    }catch (err) {
        console.error(`DB 조회 실패: ${err.message}`);
    }
}

export const getMessages = async (roomId) =>{
    try {
        const conn = await pool.getConnection();
        const [result] = await pool.query(getMessageAll,roomId)
        conn.release();

        return result;
    } catch (err) {
        console.error(`DB 조회 실패: ${err.message}`);
    }
}