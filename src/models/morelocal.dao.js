import { pool } from "../../config/db.config.js";
import { getLetterList } from "./morelocal.sql.js";

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
