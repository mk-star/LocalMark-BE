import { pool } from "../../config/db.config.js";
import { getLetterList, getLetterInfo } from "./morelocal.sql.js";

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

        console.log("dao letter", letter[0]);

        conn.release();
        return letter[0];
        
    } catch (err) {
        throw new Error(err.message)
    }
}
