import { status } from "../../config/response.status.js";
import { 
    confirmPost, 
    deletePostSql, 
    getPostDetail, 
    getPosts, 
    getPostsByCategory, 
    insertPost, 
    updatePostSql } from "./post.sql.js";

const pool = require("../../config/database");

export const addPost = async(data)=> {
  try{

    const conn = await pool.getConnection();
    const [addPost] = await pool.query(insertPost, [data.userId, data.category, data.title, data.thumnail_filename, data.content]);
    conn.release();

    return addPost;
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
}

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
        throw new BaseError(status.BAD_REQUEST);
    }
}

export const updatePost = async(data) => {
    try {

        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmPost, postId);

        if (!confirm[0].isExistPost) {
            conn.release();
            return -1;
        }

        const result = await pool.query(updatePostSql, [
            data.title,
            data.content,
            data.category,
            data.thumbnail_filename,
            data.postId,
        ]);
      
        conn.release();

        return result[0].affectedRows;
        
    } catch (error) {
        throw new BaseError(status.BAD_REQUEST);
    }
}


export const deletePost = async (postId) => {
    
    try {
      const conn = await pool.getConnection();
  
      const [confirm] = await pool.query(confirmPost, postId);
  
      if (!confirm[0].isExistPost) {
        conn.release();
        return -1;
      }
  
      const result = await pool.query(deletePostSql, postId);
      
      conn.release();
     
      return result[0].affectedRows;
    } catch (err) {
        throw new BaseError(status.BAD_REQUEST);
    }

}
