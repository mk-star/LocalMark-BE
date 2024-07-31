const { pool } = require('../../config/database');

class UserDAO {
    static async findByID(id) {
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
    }
    static async findByEmail(email) {
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
    }

    static async createUser(user) {
        return new Promise((resolve, reject) => {
            const sql = `
                INSERT INTO User (id, email, password, name, nickname, phone, birth, type, status, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
            `;
            const values = [user.id, user.email, user.password, user.name, user.nickname, user.phone, user.birth, user.type, user.status];
            pool.query(sql, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
}

module.exports = UserDAO;
