const UserService = require('../services/user.service');
const { response, errResponse } = require('../../config/response');

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
    static async findUsername(req, res){
        const { email } = req.body;
        try {
            const result = await UserService.findUsernameByEmail(email);
            if (result) {
            return res.status(201).json(response({ isSuccess: true, code: 201, message: 'Username has been sent to your email' }, result));
            } else {
            return res.status(400).json(errResponse({ isSuccess: false, code: 400, message:'Email not found'}));
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}
module.exports = UserController;
