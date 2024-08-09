import { registerUserService, findUsernameByEmailService, getOrdersService, getOrderItemNumberService, getOrderItemsService, updateUserService, updatePasswordService, updatePasswordEmailService  } from '../services/user.service.js';
import { response, errResponse } from '../../config/response.js';

export const registerGeneral = async (req, res, next) => {
    try {
        const userData = req.body;
        const type = "GENERAL";
        const newUser = await registerUserService(userData, type);
        return res.status(201).json(response({ isSuccess: true, code: 201, message: 'User registered successfully' }, newUser));
    } catch (error) {
        return res.status(400).json(errResponse({ isSuccess: false, code: 400, message: error.message }));
    }
};
export const registerCreator = async (req, res, next) => {
    try {
        const userData = req.body;
        const type = "CREATOR";
        const newUser = await registerUserService(userData, type);
        return res.status(201).json(response({ isSuccess: true, code: 201, message: 'User registered successfully' }, newUser));
    } catch (error) {
        return res.status(400).json(errResponse({ isSuccess: false, code: 400, message: error.message }));
    }
};
export const findUsername = async (req, res) => {
    const { email } = req.body;
    try {
        const result = await findUsernameByEmailService(email);
        if (result) {
            return res.status(201).json(response({ isSuccess: true, code: 201, message: 'Username has been sent to your email' }, result));
        } else {
            return res.status(400).json(errResponse({ isSuccess: false, code: 400, message: 'Email not found' }));
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getOrderItems = async (req, res) => {
    const userId = req.currentId;
    const paramId = req.params.userId;
    try {
        if( userId != paramId ){
            return res.status(400).json(errResponse({ isSuccess: false, code: 400, message: '접근할 권한이 없습니다.' }));
        }
        const ids = await getOrdersService(userId);
        if (ids) {
            const itemNumber = await getOrderItemNumberService(ids);
            const items = await getOrderItemsService(itemNumber);
            return res.status(201).json(response({ isSuccess: true, code: 201, message: 'Order items are found' }, items));
        } else {
            return res.status(201).json(response({ isSuccess: true, code: 201, message: 'No orders' }));
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const updateUser = async (req, res) => {
    const userId = req.currentId;
    const paramId = req.params.userId;
    const userData = req.body;
    try {
        if( userId != paramId ){
            return res.status(400).json(errResponse({ isSuccess: false, code: 400, message: '수정할 권한이 없습니다.' }));
        }
        await updateUserService(userId, userData);
        return res.status(200).json(response({ isSuccess: true, code: 200, message: 'User updated successfully' }));
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const updatePassword = async (req, res) => {
    const userId = req.currentId;
    const paramId = req.params.userId;
    const newPassword = req.body;
    try {
        if( userId != paramId ){
            return res.status(400).json(errResponse({ isSuccess: false, code: 400, message: '수정할 권한이 없습니다.' }));
        }
        await updatePasswordService(userId, newPassword);
        return res.status(200).json(response({ isSuccess: true, code: 200, message: 'User password updated successfully' }));
    } catch (error) {
        return res.status(400).json(errResponse({ isSuccess: false, code: 400, message: error.message }));
    }
};

export const updatePasswordEmail = async (req, res)=>{
    const userId = req.currentId;
    const paramId = req.params.userId;
    try {
        if( userId != paramId ){
            return res.status(400).json(errResponse({ isSuccess: false, code: 400, message: '수정할 권한이 없습니다.' }));
        }
        const respon = await updatePasswordEmailService(userId);
        if(respon){
            return res.status(201).json(response({ isSuccess: true, code: 201, message: 'The page to change the password has been sent to your email' }));
        }
        else{
            return res.status(400).json(errResponse({ isSuccess: false, code: 400, message: 'Sending email is failed' }));
        }
    } catch (error) {
        return res.status(400).json(errResponse({ isSuccess: false, code: 400, message: error.message }));
    }

}
