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
    static async getOrderItems(req, res){
        // login_required
        const user_id = req.params.userId;
        try{
            const ids = await UserService.getOrders(user_id);
            if (ids) {
                const itemNumber = await UserService.getOrderItemNumber(ids);
                const items = await UserService.getOrderItems(itemNumber);
                return res.status(201).json(response({ isSuccess: true, code: 201, message: 'Order items are found' }, items));
            } else {
                return res.status(201).json(response({ isSuccess: true, code: 201, message: 'No orders' }));
            }
        }catch(error){
            res.status(500).send(error.message);
        }
    }
    static async updateUser(req, res){
        // login_required
        const userId = req.params.userId;
        const userData = req.body;
        try{
            const updatedUser = await UserService.updateUser(userId, userData);
            return res.status(200).json(response({ isSuccess: true, code: 200, message: 'User updated successfully' }, updatedUser));
        }catch(error){
            res.status(500).send(error.message);
        }
    }
}

export default UserController;
