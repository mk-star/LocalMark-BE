import { pool } from '../../config/database.js';

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
    }
    static async getUsernameByEmail(email) {
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
    }
    static async getOrdersByID(user_id){
        return new Promise((resolve, reject)=>{
            pool.query('SELECT id FROM Orders WHERE user_id = ? AND status = "COMPLETE"', [user_id], (err, results)=>{
                if(err){
                    return reject(err);
                }
                if (results.length > 0) {
                    console.log('1111', results);
                    const ids = results.map(order => order.id);
                    resolve(ids);
                } else {
                    resolve(null);
                }
            })
        })
    }
    static async getOrderItemNumberByIDs(ids) {
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
    }
    static async getOrderItems(itemNumber){
        return new Promise((resolve, reject) =>{
            const placeholders = itemNumber.map(() => '?').join(',');
            const query = `SELECT * FROM Product WHERE id IN (${placeholders})`;
            pool.query(query, itemNumber, (error, results) => {
                if(error) {
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })
    }
}

export default UserDAO;
