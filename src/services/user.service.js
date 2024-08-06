import bcrypt from 'bcrypt';
import { findByID, findByEmail, createUser } from '../models/user.dao.js';
import { UserDTO } from '../dtos/user.dto.js';

export const registerUserService = async (userData) => {
    const existingUserByID = await findByID(userData.id);
    if (existingUserByID) {
        throw new Error('This id is already in use.');
    }
    const existingUser = await findByEmail(userData.email);
    if (existingUser) {
        throw new Error('This email is already in use.');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const userDTO = new UserDTO({
        ...userData,
        password: hashedPassword,
        status: 'active'
    });

    await createUser(userDTO);
    return { ...userData };
};
