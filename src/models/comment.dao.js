import { pool } from '../../config/database.js';
import {
  addComment,
  addCommentChild,
  selectComment,
  deleteComment,
  deleteChildComments,
  commentNum
} from './comment.sql.js';
import {confirmPost} from "./post.sql.js";


export const addCommentInfo = async(userId, postId,parentId,content)=>{
  const conn = await pool.getConnection();
  // postId가 존재하는지 확인
  const [postExist] = await pool.query(confirmPost, postId);
  if (! postExist[0].isExistPost) {
      conn.release();
      return -1;
  }

  if(parentId === null){
    try{
      const [comment] = await pool.query(addComment,[userId, postId,content])
      conn.release();
      return comment;
      }catch(err){
        console.log(`DB 저장 실패 ${err.message}`)
      }
  }else{
    try{
      const conn = await pool.getConnection();
      const [comment] = await pool.query(addCommentChild,[userId, postId,parentId,content]);
      conn.release();
      return comment;
    }catch(err){
      console.log(`DB 저장 실패 ${err.message}`)
    }
  }
  
}

export const deleteCommentInfo = async (commentIds) => {
  if (commentIds.length === 0) {
    return -1;
  }

  try {
    const conn = await pool.getConnection();
    // 자식 댓글 먼저 삭제
    await pool.query(deleteChildComments, [commentIds]);

    // 부모 댓글 삭제
    await pool.query(deleteComment, [commentIds]);
    conn.release();
  } catch (err) {
    console.error(`DB 저장 실패: ${err.message}`);
    throw err;
  }
};


export const selectCommentInfo = async(postId) =>{
  try{
    const conn = await pool.getConnection();

    // postId가 존재하는지 확인
    const [postExist] = await pool.query(confirmPost, parseInt(postId));
    if (! postExist[0].isExistPost) {
      conn.release();
      return -1;
    }

    const [comment] = await pool.query(selectComment,parseInt(postId));
    conn.release();
    return comment;
    
  }catch(err){
    console.log(`DB 호출 실패 ${err.message}`)
  }
}

export const getCommentNum = async (postId) => {
  try{
    const conn = await pool.getConnection();
    const num = await pool.query(commentNum, [postId]);
    
    conn.release();
    return num[0];
  }catch (err){
    console.log(`DB 호출 실패 ${err.message}`)
  }
}