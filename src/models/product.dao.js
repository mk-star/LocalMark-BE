import { pool } from "../../config/database.js";
import { status } from "../../config/response.status.js";
import { BaseError } from "../../config/error.js";
import { insertProductSql, selectProductSql} from "../models/product.sql.js";

export const saveProductFiles = async (userId, fileKey) => {
  try {
    const conn = await pool.getConnection();

    const encodedKey = encodeURIComponent(fileKey);
    const fileRecord = [userId, encodedKey];

    const [result] = await pool.query(insertProductSql, fileRecord);

    conn.release();
    return result.insertId;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
};

export const getProduct = async (productId) => {
  try {
    const conn = await pool.getConnection();

    const [product] = await pool.query(selectProductSql, [productId]);

    conn.release();
    return product;
  } catch (err) {
    throw new BaseError(status.PARAMETER_IS_WRONG);
  }
}