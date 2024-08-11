// 데이터베이스 관련 설정을 관리하는 파일
import mysql from "mysql2/promise"; // async await
import "dotenv/config";
import { logger } from "./winston.js";

const pool = mysql.createPool({
  host: "localmarkdb.cdya2gkiu98h.ap-northeast-2.rds.amazonaws.com",
  user: "root",
  port: 3306,
  password: "lmark1234",
  database: "localmark",
});


pool.on("connection", (connection) => {
  logger.info("DB: connection!");
});

pool.on("release", function (connection) {
  logger.info(`DB: Connection ${connection.threadId} released`);
});


export { pool };
