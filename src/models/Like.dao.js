import { pool } from '../../config/database.js';
import { postLikeWhether,postAddLike,postDeleteLike, commentLikeWhether,commentAddLike,commentDeleteLike } from './Like.sql.js';
import {confirmCommend} from "./comment.sql.js";
import {confirmPost} from "./post.sql.js";


export const postLike = async(user_id,post_id) => {
  try{
    const postId = parseInt(post_id, 10);
    const userId = parseInt(user_id, 10);

    const conn = await pool.getConnection();

    // 게시글 존재 여부 확인
    const [postExist] = await pool.query(confirmPost, postId);
    if (! postExist[0].isExistPost) {
      conn.release();
      return -1;
    }

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

export const commentLike = async (user_id, comment_id) => {
  try{
    const commentId = parseInt(comment_id, 10);
    const userId = parseInt(user_id, 10);

    const conn = await pool.getConnection();

    // 댓글 존재여부 검증
    // pool.query는 Promise를 반환하며, 그 Promise는 쿼리 결과와 필드 정보를 포함하는 배열을 반환
    const [result] = await pool.query(confirmCommend,comment_id);
    if(!result[0].isExistComment){
      conn.release();
      return -1;
    }

    const [like] =await pool.query(commentLikeWhether,[commentId, userId])
    if(like.length === 0){
      await pool.query(commentAddLike,[commentId, userId])
      console.log('좋아요 추가');
    }else {
      await pool.query(commentDeleteLike,[commentId, userId])
      console.log('좋아요 취소');
    }
    conn.release(); // 연결 해제

  }catch(err){
    console.log(`좋아요 저장 실패 ${err.message}`)
  }
}