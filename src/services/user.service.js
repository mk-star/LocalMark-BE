const bcrypt = require('bcrypt');
const UserDAO = require('../models/user.dao');
const UserDTO = require('../dtos/user.dto');

class UserService {
    static async registerUser(userData) {
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

        const userId = await UserDAO.createUser(userDTO);
        return { userId, ...userDTO };
    }
}

module.exports = UserService;
