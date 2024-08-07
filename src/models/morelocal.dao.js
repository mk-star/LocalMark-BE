import { pool } from "../../config/db.config.js";
import { status } from "../../config/response.status.js";
import { getLetterList, recentLetters, confirmLetter, getLetterInfo, getEventList, confirmEvent, getEventInfo, recentEvents } from "./morelocal.sql.js";

// 로컬레터 목록 조회
export const getLetters = async () => {
    try {
        const conn = await pool.getConnection();
        const [letters] = await pool.query(getLetterList);
        
        conn.release();
        return letters;
    } catch (err) {
        throw new Error(status.PARAMETER_IS_WRONG)
    }
}

// 로컬레터 상세 조회
export const getLetterDetail = async (letterId) => {
    try {
        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmLetter, letterId);
        if (!confirm[0].isExistLetter) {
          conn.release();
          return -1;
        }
        
        const letter = await pool.query(getLetterInfo, letterId);

        conn.release();
        return letter[0];
        
    } catch (err) {
        throw new Error(status.PARAMETER_IS_WRONG)
    }
}

// 로컬레터 최근 업데이트글 6개
export const getRecentLetters = async() => {
    try {
        const conn = await pool.getConnection();

        const [letters] = await pool.query(recentLetters);

        conn.release();
        return letters;
        
        
    } catch (err) {
        throw new Error(status.PARAMETER_IS_WRONG)
    }
}

// 이벤트 목록 조회
export const getEvents = async () => {
    try {
        const conn = await pool.getConnection();

        const [events] = await pool.query(getEventList);

        conn.release();
        return events;
    } catch (err) {
        throw new Error(status.PARAMETER_IS_WRONG)
    }
}

// 이벤트 상세 조회
export const getEventDetail = async (eventId) => {
    try {
        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmEvent, eventId);
        if (!confirm[0].isExistEvent) {
          conn.release();
          return -1;
        }

        const event = await pool.query(getEventInfo, eventId);

        conn.release();
        return event[0];
        
    } catch (err) {
        throw new Error(status.PARAMETER_IS_WRONG)
    }
}

// 이벤트 최근 업데이트글 6개
export const getRecentEvents = async() => {
    try {
        const conn = await pool.getConnection();

        const [events] = await pool.query(recentEvents);

        conn.release();
        return events;
        
        
    } catch (err) {
        throw new Error(status.PARAMETER_IS_WRONG)
    }
}