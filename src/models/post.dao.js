import { pool } from '../../config/database.js';
import { status } from "../../config/response.status";
import { createPost, uploadImages, getPostsByCategory, getPosts  } from './post.sql.js';

export const addPost = async(userId, category, title, images, content)=> {
  try{
    const conn = await pool.getConnection();
    // 게시글 저장
    const [addPost] = await pool.query(createPost,[userId, category, title, content]);
    const postId = addPost.insertId;

      // 이미지 저장
      if (images && images.length > 0) {
          images.map(async (url) => {
              await pool.query(uploadImages, [postId, url]);
          });
      }

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