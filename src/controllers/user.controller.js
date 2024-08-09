import { registerUserService } from '../services/user.service.js';
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
