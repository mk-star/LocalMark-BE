import bcrypt from "bcrypt";
import { pool } from '../../config/database.js';
import crypto from "crypto";
import { status } from "../../config/response.status.js";
import { BaseError } from "../../config/error.js";
import { smtpTransport } from "../../config/email.js";

import {
    insertTempUserSql,
    selectTempUserSql,
    updateEmailStatus,
    insertUserSql,
    updateUserSql,
    confirmEmail,
    confirmLoginId,
    confirmNickname,
    selectEmailVerification,
    selectUserSql,
    updateActiveUserSql,
    updateInactiveUserSql
} from "../models/user.sql.js";

export const findByID = async(userId) => {
    const sql = `SELECT * FROM User WHERE id = ?`;
    const conn = await pool.getConnection();
    try {
        const [results] = await pool.query(sql, [userId]);
        conn.release();
        return results[0];
    } catch (error) {
        throw error;
    }
}

export const createTemporaryUser = async (email, token, expires) => {
    try {
        const conn = await pool.getConnection();

        const [confirm] = await pool.query(confirmEmail, [email]);
        if (confirm[0].isExistEmail) {
          conn.release();
          return -1;
        }
        const [user] = await pool.query(insertTempUserSql, [email, token, expires]);
    
        conn.release();
        return user.insertId;
      } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
      }
};

export const sendVerificationEmail = async (email, token, expires) => {
    try {
        const mailOptions = {
            from: process.env.NODEMAILER_USER, // 발신자 이메일 주소.
            to: email,
            subject: `[LOCAL MARK] 이메일 인증`,
            html: `<p>안녕하세요</p>
            <p>이메일 인증을 위해 아래 링크를 눌러주세요.</p>
            <p><a href="https://umc.localmark.store/users/verify-email?token=${token}&expires=${expires}">Verify email</a></p>
            <p>감사합니다.</p>
            <p>LOCAL MARK</p>`,
        };
        await smtpTransport.sendMail(mailOptions);
    } catch (err) {
      throw new BaseError(status.EMAIL_SENDING_FAILED);
    }
}

export const getUserByVerifyToken = async (token, expires) => {
    try {
        const conn = await pool.getConnection();
        const [user] =  await pool.query(selectTempUserSql, [token]);
        if(!user) {
            conn.release();
            return -1;
        }
        const expiresTime = new Date(expires).getTime();
        const currentTime = new Date().getTime();

        console.log(expiresTime);
        console.log(currentTime);
        console.log(expiresTime < currentTime);
        if (expiresTime < currentTime) {
            conn.release();
            return -2; // 토큰이 만료됨
        }
        console.log(user[0]);
        conn.release();
        return user[0];
      } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
      }
}

export const modifyEmailStatus = async (user) => {
    try {
        const conn = await pool.getConnection();
        
        if (user.is_email_verified == 1) {
            return -1;
        }
        const [result] = await pool.query(updateEmailStatus, [user.email]);

        conn.release();
        return result.affectedRows;
      } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
      }
}

export const createUser = async (userData) => {
    try {
        const conn = await pool.getConnection();

        const [rows] = await pool.query(selectEmailVerification, [userData.email]);
        if (rows.length === 0 || rows[0].is_email_verified == 0) {
          conn.release();
          return -1;
        }
        const [confirm1] = await pool.query(confirmLoginId, [userData.loginId]);
        if (confirm1[0].isExistLoginId) {
          conn.release();
          return -2;
        }
        const [confirm2] = await pool.query(confirmNickname, [userData.nickname]);
        if (confirm2[0].isExistNickname) {
          conn.release();
          return -3;
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const [result] = await pool.query(insertUserSql, [userData.loginId, hashedPassword, userData.nickname, userData.type, userData.status, userData.email]);
    
        conn.release();
        return result.affectedRows;
        } catch (err) {
            throw new BaseError(status.PARAMETER_IS_WRONG);
    };
}

export const changeIsEmailVerified = async (userId) => {
    const sql = `
        UPDATE User SET
            is_email_verified = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
    `;
    const values = [1, userId];
    const conn = await pool.getConnection();
    try {
        const [results] = await pool.query(sql, values);
        await conn.commit();
        conn.release();
        return results;
    } catch (error) {
        conn.release();
        throw error;
    }
};

export const changeIsBrandRegistered = async (userId) => {
    const sql = `
        UPDATE User SET
            is_brand_registered = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;
    const values = [1, userId];
    const conn = await pool.getConnection();
    try{
        const [results] = await pool.query(sql, values);
        await conn.commit();
        conn.release();
        return ;
    } catch(error){
        conn.release();
        throw error;
    }
}
export const updateUser = async (userId, userData) => {
    try {
        const conn = await pool.getConnection();

        const [confirm1] = await pool.query(confirmLoginId, [userData.loginId]);
        if (confirm1[0].isExistLoginId) {
          conn.release();
          return -1;
        }

        const [confirm2] = await pool.query(confirmNickname, [userData.nickname]);
        if (confirm2[0].isExistNickname) {
          conn.release();
          return -2;
        }

        const [result] = await pool.query(updateUserSql, [userData.loginId, userData.email, userData.nickname, userId]);
    
        conn.release();
        return result.affectedRows;
    } catch (err) {
        console.error("Error in createUser:", err);
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
}

export const updatePassword = async(userId, newHashedPassword) =>{
    const sql = `
        UPDATE User SET
            password = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;
    const values = [
        newHashedPassword, userId
    ];
    try{
        const [results] = await pool.query(sql, values);
        return results;
    } catch(error) {
        throw error;
    }
}

export const getUsernameByEmail = async (email) => {
    const sql=`
        SELECT id, nickname FROM User WHERE email = ?
    `;
    const conn = await pool.getConnection();
    try{
        const results = await pool.query(sql, [email]);
        conn.release();
        return results[0];
    } catch(error){
        conn.release();
        throw error;
    }
};

export const getOrdersByID = async (userId) => {
    const sql = `
        SELECT id FROM Orders WHERE user_id = ? AND status = "COMPLETE"
    `;
    try{
        const [results] = await pool.query(sql, [userId]);
        if(results.length>0){
            const ids = results.map(order => order.id);
            return ids;
        }
        else{
            return null;
        }
    }catch(error){
        throw(error)
    }
};

export const getOrderItemNumberByIDs = async (ids) => {
    const placeholders = ids.map(()=>'?').join(',');
    const sql = `SELECT product_id FROM Order_Item WHERE order_id IN (${placeholders})`;
    try{
        const [results] = await pool.query(sql, ids)
        if (results.length > 0) {
            const ids = results.map(order => order.product_id);
            return ids;
        }
        else{
            return(null);
        }
    }catch(error){
        throw(error);
    }
};

export const getOrderItems = async (itemNumber) => {
    const placeholders = itemNumber.map(() => '?').join(',');
    const sql = `SELECT * FROM Product WHERE id IN (${placeholders})`;
    try{
        const [results] = await pool.query(sql, itemNumber)
        return results;
    } catch(error){
        throw(error);
    }
};

export const verifyEmail = async (loginId, email) => {  
    try {
      const conn = await pool.getConnection();

      const [confirm] = await pool.query(confirmLoginId, [loginId]);
      if (!confirm[0].isExistLoginId) {
        conn.release();
        return -1;
      }

      const [user] = await pool.query(selectUserSql, [loginId]);
      if (user[0].email != email) {
        conn.release();
        return -2;
      }

      conn.release();
      return user[0];
    } catch (err) {
      throw new BaseError(status.PARAMETER_IS_WRONG);
    }
  };
  
export const resetPasswordByEmail = async (email, nickname) => {
    const token = crypto.randomBytes(20).toString("hex");
    const expires = new Date();
    expires.setHours(expires.getHours() + 1); //1시간 이후 만료
  
    const mailOptions = {
      from: process.env.NODEMAILER_USER, // 발신자 이메일 주소.
      to: email, //사용자가 입력한 이메일 -> 목적지 주소 이메일
      subject: `[LOCAL MARK] ${nickname} 님의 비밀번호 찾기 안내드립니다.`,
      html: `<p>안녕하세요 ${nickname} 님</p>
      <p>아래 링크를 클릭하여 비밀번호를 변경해주세요.</p>
      <p><a href="http://localhost:6/verify-email/?email=${email}?token=${token}">Verify email</a></p>
      <p>${nickname} 님이 요청하지 않은 비밀번호 찾기라면, localmark.team@gmail.com로 연락 부탁드립니다.</p>`,
    };
  
    try {
      smtpTransport.sendMail(mailOptions, (err, info) => {
        if (err) {
          smtpTransport.close(); // 전송 종료
          conn.release(); // 연결 종료
          return -1;
        } else {
          smtpTransport.close(); // 전송 종료
          conn.release(); // 연결 종료
          console.log(info.response);
          return info.response;
        }
      });
    } catch (err) {
      smtpTransport.close();
      throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};
  
export const deleteUserById = async (userId) => {
    try {
        const conn = await pool.getConnection();

        // ACTIVE한 유저의 상태를 바꿈, inactive_date 설정
        const [result] = await pool.query(updateActiveUserSql, [userId]);
    
        conn.release();
        return result.affectedRows;
        } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    };
};
  
export const restoreUserById = async (userId) => {
    try {
        const conn = await pool.getConnection();
    
        // INACTIVE한 유저의 상태를 바꿈
        const [result] = await pool.query(updateInactiveUserSql, [userId]);
    
        conn.release();
        return result.affectedRows;
        } catch (err) {
        throw new BaseError(status.PARAMETER_IS_WRONG);
    }
};