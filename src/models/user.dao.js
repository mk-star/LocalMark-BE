import { pool } from '../../config/database.js';

export const findByID = async (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM User WHERE id = ?`;
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
