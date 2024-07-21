import { status } from "../../config/response.status";

const pool = require("../../config/database");

export const getPreviewPostsByCategory = async(category, page) => {

    try {
        const conn = await pool.getConnection();

        const limit = 7;
        const offset = (page - 1) * limit;

        const [posts] = await pool.query(getPostsByCategory, [category, limit, offset]);
        conn.release();
        return posts;
    } catch (error) {
        throw new BaseError(status.BAD_REQUEST);
    }
};

export const getPreviewPosts = async(page) => {


    try {
        const conn = await pool.getConnection();

        const limit = 7;
        const offset = (page - 1) * limit;
    
        const [posts] = await pool.query(getPosts, [limit, offset]);
        conn.release();

        return posts;
    } catch (error) {
        throw new BaseError(status.BAD_REQUEST);
    }

 
}