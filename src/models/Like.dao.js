import { pool } from '../../config/database.js';
import { postLikeWhether,postAddLike,postDeleteLike } from './Like.sql.js';

export const postLike = async(user_id,post_id)=>{
  try{
    const postId = parseInt(post_id, 10);
    const userId = parseInt(user_id, 10);
    const conn = await pool.getConnection();
    const [like] =await pool.query(postLikeWhether,[postId, userId])
    if(like.length === 0){
      await pool.query(postAddLike,[postId, userId])
      console.log('좋아요 추가');
    }else {
    await pool.query(postDeleteLike,[postId, userId])
    console.log('좋아요 취소');
    }
    conn.release(); // 연결 해제

  }catch(err){
    console.log(`좋아요 저장 실패 ${err.message}`)
  }
}