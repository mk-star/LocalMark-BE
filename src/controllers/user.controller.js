import { registerUserService, findUsernameByEmailService, getOrdersService, getOrderItemNumberService, getOrderItemsService, updateUserService,  } from '../services/user.service.js';
import { response, errResponse } from '../../config/response.js';

export const registerUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const newUser = await registerUserService(userData);
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
    const user_id = req.params.userId;
    try {
        const ids = await getOrdersService(user_id);
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
    const userId = req.params.userId;
    const userData = req.body;
    try {
        await updateUserService(userId, userData);
        return res.status(200).json(response({ isSuccess: true, code: 200, message: 'User updated successfully' }));
    } catch (error) {
        res.status(500).send(error.message);
    }
};
