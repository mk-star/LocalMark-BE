import { pool } from '../../config/database.js';

export const findByID = async (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM User WHERE loginId = ?`;
        pool.query(sql, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
};

export const findByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM User WHERE email = ?`;
        pool.query(sql, [email], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
};

export const createUser = async (user) => {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO User (loginId, email, password, nickname, type, status, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;
        const values = [user.loginId, user.email, user.password, user.nickname, user.type, user.status];
        pool.query(sql, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};

export const updateUser = async (userId, userData) => {
    const sql = `
        UPDATE User SET
            loginId = ?, email = ?, password = ?, nickname = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;
    const values = [
        userData.loginId, userData.email, userData.password, userData.nickname, userId
    ];
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

export const getUsernameByEmail = async (email) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT id, nickname, name FROM User WHERE email = ?', [email], (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length > 0) {
                resolve(results[0]);
            } else {
                resolve(null);
            }
        });
    });
};

export const getOrdersByID = async (user_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT id FROM Orders WHERE user_id = ? AND status = "COMPLETE"', [user_id], (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length > 0) {
                const ids = results.map(order => order.id);
                resolve(ids);
            } else {
                resolve(null);
            }
        });
    });
};

export const getOrderItemNumberByIDs = async (ids) => {
    return new Promise((resolve, reject) => {
        const placeholders = ids.map(() => '?').join(',');
        const query = `SELECT product_id FROM Order_Item WHERE order_id IN (${placeholders})`;
        pool.query(query, ids, (error, results) => {
            if (error) {
                reject(error);
            }
            if (results.length > 0) {
                const ids = results.map(order => order.product_id);
                resolve(ids);
            } else {
                resolve(null);
            }
        });
    });
};

export const getOrderItems = async (itemNumber) => {
    return new Promise((resolve, reject) => {
        const placeholders = itemNumber.map(() => '?').join(',');
        const query = `SELECT * FROM Product WHERE id IN (${placeholders})`;
        pool.query(query, itemNumber, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};
