const { pool } = require('../../config/database');

exports.getUsernameByEmail = (email) => {
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
