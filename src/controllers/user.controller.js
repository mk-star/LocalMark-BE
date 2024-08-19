import { registerUserService, verifyUserEmail, getUserInfo, findUsernameByEmailService, getOrdersService, getOrderItemNumberService, getOrderItemsService, updateUserService, updatePasswordService, updatePasswordEmailService, resetPassword, deleteUser } from '../services/user.service.js';
import { response, errResponse } from '../../config/response.js';
import { status } from "../../config/response.status.js";

export const registerUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const newUser = await registerUserService(userData);
        res.send(response(status.SUCCESS, 'User registered successfully', { user: newUser }));
    } catch(err) {
        next(err);
    }
};
export const verifyEmail = async (req, res) => {
    try{
        const { email } = req.query;
        await verifyUserEmail(email);
        res.send(response(status.SUCCESS, 'Email verified successfully!'));
    } catch(err) {
        next(err);
    }
};

export const getInfo = async (req, res) => {
    try {
        const userId = req.currentId;
        const userData = await getUserInfo(userId);
        const user = {id: userData.id, email: userData.email, nickname: userData.nickname, type: userData.type, is_brand_registered: userData.is_brand_registered };
        res.send(response(status.SUCCESS, 'Get user info successfully!', {user: user}));
    } catch(err) {
        next(err);
    }
}

export const findUsername = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await findUsernameByEmailService(email);
        res.send(response(status.SUCCESS, 'Username has been sent to your email', {loginId: result}));
    } catch(err) {
        next(err);
    }
};

export const getOrderItems = async (req, res) => {
    try {
        const userId = req.currentId;
        const ids = await getOrdersService(userId);
        if (ids) {
            const itemNumber = await getOrderItemNumberService(ids);
            const items = await getOrderItemsService(itemNumber);
            res.send(response(status.SUCCESS, 'Order items are found', {item: items}));
        }
    } catch(err) {
        next(err);
    }
};

export const updateUser = async (req, res) => {
    try {
        const userId = req.currentId;
        const userData = req.body;
        await updateUserService(userId, userData);
        res.send(response(status.SUCCESS, 'User updated successfully'));
    } catch(err) {
        next(err);
    }
};

export const updatePassword = async (req, res) => {
    try {
        const userId = req.currentId;
        const newPassword = req.body;
        await updatePasswordService(userId, newPassword);
        res.send(response(status.SUCCESS, 'User password updated successfully' ));
    } catch(err) {
        next(err);
    }
};

export const updatePasswordEmail = async (req, res)=>{
    try {
        const userId = req.currentId;
        const respon = await updatePasswordEmailService(userId);
        if(respon){
            res.send(response(status.SUCCESS, 'The page to change the password has been sent to your email'));
        }
    } catch(err) {
        next(err);
    }
}

export const findPassword = async (req, res, next) => {
    console.log("비밀번호 찾기 요청입니다.");

    const { loginId, email } = req.body;
    const result = await resetPassword(loginId, email);
    res.send(response(status.SUCCESS, result));
};

export const removeUser = async (req, res, next) => {
    const result = await deleteUser(req.currentId);
    if (result == 1) {
        req.headers["Authorization"] = null;
        res.clearCookie("refreshToken");
        res.send(response(status.SUCCESS, "회원 탈퇴가 완료되었습니다."));
    } else if (result == 2) {
        res.send(response(status.SUCCESS, "회원 탈퇴 취소가 완료되었습니다."));
    }
};