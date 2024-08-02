import { pool } from "../../config/db.config.js";
import { getBrandInfo } from "./brand.sql.js";

// 로컬레터 목록 조회
export const getBrandInfos = async (brandId) => {
    try {
        const conn = await pool.getConnection();
        const brand = await pool.query(getBrandInfo, brandId);
        
        conn.release();
        return brand[0];
    } catch (err) {
        throw new Error(err.message)
    }
}