import { pool } from '../../config/database.js';
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