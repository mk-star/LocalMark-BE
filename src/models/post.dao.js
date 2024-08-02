import { status } from "../../config/response.status";

const pool = require("../../config/database");
import { createPost } from './post.sql.js'; 

export const addPost = async(userId, category, title, image, type, content)=> {
  try{
    const conn = await pool.getConnection();
    const [addPost] = await pool.query(createPost,[userId, category, title, image, type, content]);
    conn.release();
    return addPost
  }catch(err){
    console.log(`DB 저장 실패 ${err.message}`)
  }
}

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