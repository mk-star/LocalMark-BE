import { pool } from "../../config/database.js"
import { status } from "../../config/response.status.js";
import { confirmProductStock } from "./stock.sql.js";
import { BaseError } from "../../config/error.js";

export const confirmStock = async(productOptionId) => {

    try {

        const conn = await pool.getConnection();
        const [result] = await pool.query(confirmProductStock, productOptionId);

        conn.release();

        if(result.length > 0 && result[0].stock > 0) {
            return result[0].stock;
        } else {
            return new Error("no stock");
        }

    } catch (error) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }

}