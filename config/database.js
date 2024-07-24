// 데이터베이스 관련 설정을 관리하는 파일
const mysql = require("mysql2/promise"); // async await
import "dotenv/config";
const { logger } = require("./winston");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.on("connection", (connection) => {
  logger.info("DB: connection!");
});

pool.on("release", function (connection) {
  logger.info(`DB: Connection ${connection.threadId} released`);
});

module.exports = pool;
