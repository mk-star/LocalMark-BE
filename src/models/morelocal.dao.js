import { pool } from "../../config/db.config.js";
import { getLetterList, getLetterInfo, getEventList, getEventListByRegion, getEventInfo } from "./morelocal.sql.js";

// 로컬레터 목록 조회
export const getLetters = async () => {
    try {
        const conn = await pool.getConnection();
        const [letters] = await pool.query(getLetterList);

        conn.release();
        return letters;
        
    } catch (err) {
        throw new Error(err.message)
    }
}

// 로컬레터 상세 조회
export const getLetterDetail = async (letterId) => {
    try {
        const conn = await pool.getConnection();
        const letter = await pool.query(getLetterInfo, letterId);

        conn.release();
        return letter[0];
        
    } catch (err) {
        throw new Error(err.message)
    }
}

// 이벤트 목록 조회
export const getEvents = async (regionId) => {
    try {
        const conn = await pool.getConnection();

        if(regionId == "undefined" || typeof regionId == "undefined" || regionId == null){
            const [events] = await pool.query(getEventList);

            conn.release();
            return events;
        } else {
            const [events] = await pool.query(getEventListByRegion, regionId);

            conn.release();
            return events;
        }
        
    } catch (err) {
        throw new Error(err.message)
    }
}

// 이벤트 상세 조회
export const getEventDetail = async (eventId) => {
    try {
        const conn = await pool.getConnection();
        const event = await pool.query(getEventInfo, eventId);

        conn.release();
        return event[0];
        
    } catch (err) {
        throw new Error(err.message)
    }
}