const bcrypt = require('bcrypt');
const UserDAO = require('../models/user.dao');
const UserDTO = require('../dtos/user.dto');

class UserService {
    static async registerUser(userData) {
        const existingUserByID = await UserDAO.findByID(userData.id);
        if (existingUserByID) {
            throw new Error('This id is already in use.');
        }
        const existingUser = await UserDAO.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('This email is already in use.');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const userDTO = new UserDTO({
            ...userData,
            password: hashedPassword,
            status: 'active'
        });

        await UserDAO.createUser(userDTO);
        return {  ...userData };
    }
}

module.exports = UserService;
