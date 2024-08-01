import UserService from '../services/user.service.js';
import { response, errResponse } from '../../config/response.js';

class UserController {
    static async registerUser(req, res, next) {
        try {
            const userData = req.body;
            const newUser = await UserService.registerUser(userData);
            return res.status(201).json(response({ isSuccess: true, code: 201, message: 'User registered successfully' }, newUser));
        } catch (error) {
            return res.status(400).json(errResponse({ isSuccess: false, code: 400, message: error.message }));
        }
    }
}

export default UserController;
