import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { findByID, findByEmail, createUser, updateUser, getUsernameByEmail, getOrdersByID, getOrderItemNumberByIDs, getOrderItems } from '../models/user.dao.js';
import { UserDTO } from '../dtos/user.dto.js';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

export const registerUserService = async (userData) => {
    const existingUserByID = await findByID(userData.loginId);
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
        status: 'active',
    });

    await createUser(userDTO);
    return { ...userData };
};

export const findUsernameByEmailService = async (email) => {
    try {
        const user = await getUsernameByEmail(email);
        if (user) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Your Account Username',
                text: `Your username is: ${user.id}`,
            };
            await transporter.sendMail(mailOptions);
            return user;
        }
        return false;
    } catch (error) {
        throw error;
    }
};

export const getOrdersService = async (user_id) => {
    try {
        const orders = await getOrdersByID(user_id);
        return orders;
    } catch (error) {
        throw error;
    }
};

export const getOrderItemNumberService = async (ids) => {
    try {
        const itemNumber = await getOrderItemNumberByIDs(ids);
        return itemNumber;
    } catch (error) {
        throw error;
    }
};

export const getOrderItemsService = async (itemNumber) => {
    try {
        const items = await getOrderItems(itemNumber);
        return items;
    } catch (error) {
        throw error;
    }
};

export const updateUserService = async (userId, userData) => {
    try {
        const existingUserByID = await findByID(userData.loginId);
        if (existingUserByID) {
            throw new Error('This id is already in use.');
        }
        const existingUser = await findByEmail(userData.email);
        if (existingUser) {
            throw new Error('This email is already in use.');
        }
        const updateUserDTO = new UserDTO(userData);
        const updatedUser = await updateUser(userId, updateUserDTO);
        return updatedUser;
    } catch (error) {
        throw error;
    }
};
