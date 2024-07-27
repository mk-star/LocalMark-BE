import { status } from "../../config/response.status";
import { getPostDetail, getPosts, getPostsByCategory } from "./post.query";

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

export const getPreviewPostDetail = async(postId) => {
    try {
        
        const conn = await pool.getConnection();
        const postDetail = await pool.query(getPostDetail, postId);

        console.log("게시글 상세: ", postDetail[0]);
        
        conn.release();

        return postDetail[0];

    } catch (error) {
        throw new Error(err.message);
    }
}