import { pool } from '../../config/database.js';

export const findByID = async(userId) => {
    const sql = `SELECT * FROM User WHERE id = ?`;
    try {
        const [results] = await pool.query(sql, [userId]);
        return results[0];
    } catch (error) {
        throw error;
    }
}

export const findByLoginID = async (loginId) => {
    const sql = `SELECT * FROM User WHERE loginId = ?`;
    try {
        const [results] = await pool.query(sql, [loginId]);
        return results[0];
    } catch (error) {
        throw error;
    }
};


export const findByEmail = async (email) => {
    const sql = `SELECT * FROM User WHERE email = ?`;
    try{
        const [results] = await pool.query(sql, [email]);
        return results[0];
    } catch (error) {
        throw error;
    }
};

export const createUser = async (userData, hashedPassword, type) => {
    const sql = `
        INSERT INTO User (loginId, email, password, nickname, type, status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    const values = [userData.loginId, userData.email, hashedPassword, userData.nickname, type, userData.status];
    try{
        const [results] = await pool.query(sql, values);
        console.log(results[0]);
        return results[0];
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (userId, userData) => {
    const sql = `
        UPDATE User SET
            loginId = ?, email = ?, nickname = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;
    const values = [
        userData.loginId, userData.email, userData.nickname, userId
    ];
    try{
        const [results] = await pool.query(sql, values);
        return results[0];
    } catch (error) {
        console.error('SQL Error:', error);
        throw error;
    }
};
export const updatePassword = async(userId, newHashedPassword) =>{
    const sql = `
        UPDATE User SET
            password = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;
    const values = [
        newHashedPassword, userId
    ];
    try{
        const [results] = await pool.query(sql, values);
        console.log('3333',results)
        return results;
    } catch(error) {
        console.error('SQL Error:', error);
        throw error;
    }
}

export const getUsernameByEmail = async (email) => {
    const sql=`
        SELECT id, nickname, name FROM User WHERE email = ?
    `
    try{
        const results = await pool.query(sql, [email]);
        return results[0]
    } catch(error){
        console.error('SQL Error:', error);
        throw error;
    }
};

export const getOrdersByID = async (userId) => {
    const sql = `
        SELECT id FROM Orders WHERE user_id = ? AND status = "COMPLETE"
    `
    try{
        const [results] = await pool.query(sql, [userId]);
        if(results.length>0){
            const ids = results.map(order => order.id);
            return ids;
        }
        else{
            return null;
        }
    }catch(error){
        throw(error)
    }
};

export const getOrderItemNumberByIDs = async (ids) => {
    const placeholders = ids.ma(()=>'?').join(',');
    const sql = `SELECT product_id FROM Order_Item WHERE order_id IN (${placeholders})`;
    try{
        const [results] = await pool.query(sql, ids)
        if (results.length > 0) {
            const ids = results.map(order => order.product_id);
            return ids;
        }
        else{
            return(null);
        }
    }catch(error){
        throw(error);
    }
};

export const getOrderItems = async (itemNumber) => {
    const placeholders = itemNumber.map(() => '?').join(',');
    const sql = `SELECT * FROM Product WHERE id IN (${placeholders})`;
    try{
        const [results] = await pool.query(sql, itemNumber)
        return results;
    } catch(error){
        throw(error);
    }
};
