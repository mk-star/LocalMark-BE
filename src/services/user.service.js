import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { findByID, findByLoginID, findByEmail, createUser, createCreator, changeIsEmailVerified, updateUser, getUsernameByEmail, getOrdersByID, getOrderItemNumberByIDs, getOrderItems, updatePassword, verifyEmail, resetPasswordByEmail, deleteUserById, restoreUserById } from '../models/user.dao.js';

const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
});

export const registerUserService = async (userData, type) => {
    const existingUserByID = await findByLoginID(userData.loginId);
    if (existingUserByID) {
        throw new Error('This id is already in use.');
    }
    const existingUser = await findByEmail(userData.email);
    if (existingUser) {
        throw new Error('This email is already in use.');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    if(type =='CREATOR'){
        await createCreator(userData, hashedPassword, type);
    }else{
        await createUser(userData, hashedPassword, type);
    }
    // 회원에 대한 정보 db에 저장 후 확인 이메일 보내기
    const mailOptions = {
        from: process.env.NODEMAILER_USER, // 발신자 이메일 주소.
        to: userData.email,
        subject: `[LOCAL MARK] 이메일 인증`,
        html: `<p>안녕하세요 ${userData.loginId} 님</p>
        <p>이메일 인증을 위해 아래 링크를 눌러주세요.</p>
        <p><a href="http://localhost:3000/users/verify-email/?email=${encodeURIComponent(userData.email)}">Verify email</a></p>
        <p>감사합니다.</p>
        <p>LOCAL MARK</p>`,
        };
    await transporter.sendMail(mailOptions);
    return { userData };
};
export const verifyUserEmail = async (email) => {
    try{
        const user = await getUsernameByEmail(email);
        const result = await changeIsEmailVerified(user[0].id);
        return result;
    } catch (error) {
        throw error;
    }
}

export const findUsernameByEmailService = async (email) => {
    try {
        const user = await getUsernameByEmail(email);
        if (user) {
            const mailOptions = {
                from: process.env.NODEMAILER_USER, // 발신자 이메일 주소.
                to: email, //사용자가 입력한 이메일 -> 목적지 주소 이메일
                subject: `[LOCAL MARK] ${user[0].nickname} 님의 아이디를 안내드립니다.`,
                html: `<p>안녕하세요 ${user[0].nickname} 님</p>
                <p>${user[0].nickname} 님의 아이디는 다음과 같습니다:</p>
                <p>아이디: ${user[0].loginId}</p>
                <p>${user[0].nickname} 님이 요청하지 않은 아이디 찾기라면, localmark.team@gmail.com로 연락 부탁드립니다.</p>`,
              };
            await transporter.sendMail(mailOptions);
            return user;
        }
        return false;
    } catch (error) {
        throw error;
    }
};

export const getOrdersService = async (user_id) => {
    try {
        const orders = await getOrdersByID(user_id);
        return orders;
    } catch (error) {
        throw error;
    }
};

export const getOrderItemNumberService = async (ids) => {
    try {
        const itemNumber = await getOrderItemNumberByIDs(ids);
        return itemNumber;
    } catch (error) {
        throw error;
    }
};

export const getOrderItemsService = async (itemNumber) => {
    try {
        const items = await getOrderItems(itemNumber);
        return items;
    } catch (error) {
        throw error;
    }
};

export const updateUserService = async (userId, userData) => {
    try {
        const existingUserByID = await findByID(userData.loginId);
        if (existingUserByID) {
            throw new Error('This id is already in use.');
        }
        const existingUser = await findByEmail(userData.email);
        if (existingUser) {
            throw new Error('This email is already in use.');
        }
        const updatedUser = await updateUser(userId, userData);
        return updatedUser;
    } catch (error) {
        throw error;
    }
};

export const updatePasswordService = async (userId, newPassword) => {
    try{
        const newHashedPassword = await bcrypt.hash(newPassword['password'], 10);
        const updatedPasswordUser = await updatePassword(userId, newHashedPassword);
        return updatedPasswordUser;
    } catch (error) {
        throw error;
    }
};

export const updatePasswordEmailService = async (userId) =>{
    try{
        const userData = await findByID(userId);
        if (userData) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: userData.email,
                subject: 'Your Account Username',
                text: `비밀번호 변경링크입니다.\n\nhttps://example.com/${userData.id}/change-password`,
            };
            await transporter.sendMail(mailOptions);
            return true;
        }
        return false;
    } catch(error){
        throw error;
    }
}

export const resetPassword = async (loginId, email) => {
    const user = await verifyEmail(loginId, email);
    if (user == -1) {
        throw new BaseError(status.LOGINID_NOT_EXISTS);
    } else if (user == -2) {
        throw new BaseError(status.EMAIL_NOT_EXISTS);
    }
  
    const result = await resetPasswordByEmail(email, user.nickname);
    if (result == -1) {
      throw new BaseError(status.EMAIL_SENDING_FAILED);
    }
  
    return "비밀번호 찾기 메일 전송에 성공하였습니다.";
  };
  
  export const deleteUser = async (userId) => {
    const user = await findByID(userId);
    if (!user) {
        throw new BaseError(status.USER_NOT_EXISTS);
    }

    if (user.status == 'ACTIVE') {
        await deleteUserById(userId);
        return 1;
    } else if(user.status == 'INACTIVE') {
        await restoreUserById(userId);
        return 2;
    }
  };
