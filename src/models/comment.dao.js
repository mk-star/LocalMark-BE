import { pool } from '../../config/database.js';
import { addComment, addCommentChild, selectComment ,deleteComment, deleteChildComments} from './comment.sql.js';
import {postExists} from "./post.sql";

export const addCommentInfo = async(userId, postId,parentId,content)=>{
  const conn = await pool.getConnection();
  // postId가 존재하는지 확인
  const [postExist] = await pool.query(postExists, postId);
  if (postExist.length === 0) {
    throw new Error('postId가 존재하지 않습니다.');
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
    throw new Error('삭제할 댓글 ID가 제공되지 않았습니다.');
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
    const [comment] = await pool.query(selectComment,postId);
    conn.release();
    return comment;
    
  }catch(err){
    console.log(`DB 호출 실패 ${err.message}`)
  }
}