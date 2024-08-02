import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import UserDAO from '../models/user.dao.js';
import UserDTO from '../dtos/user.dto.js';

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

class UserService {
    static async registerUser(userData) {
        const existingUserByID = await UserDAO.findByID(userData.loginId);
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
            status: 'active',
        });

        await UserDAO.createUser(userDTO);
        return { ...userData };
    }

    static async findUsernameByEmail(email) {
        try {
            const user = await UserDAO.getUsernameByEmail(email);
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
    }
    static async getOrders(user_id){
      try{
        const orders = await UserDAO.getOrdersByID(user_id);
        return orders;
      }catch (error) {
        throw error;
      }
    }
    static async getOrderItemNumber(ids){
      try{
        const itemNumber = await UserDAO.getOrderItemNumberByIDs(ids);
        return itemNumber;
      }catch (error) {
        throw error;
      }
    }
    static async getOrderItems(itemNumber){
      try{
        const items = await UserDAO.getOrderItems(itemNumber);
        return items;
      }catch (error) {
        throw error;
      }
    }
    static async updateUser(userId, userData){
      try{
        const existingUserByID = await UserDAO.findByID(userData.loginId);
        if (existingUserByID) {
            throw new Error('This id is already in use.');
        }
        const existingUser = await UserDAO.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('This email is already in use.');
        }
        const updateUserDTO = new UserDTO(userData);
        const updatedUser = await UserDAO.updateUser(userId, updateUserDTO);
        return updatedUser;
      }catch(error){
        throw error;
      }
    }
}

export default UserService;
