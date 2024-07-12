const express = require("express");
const compression = require("compression");
const methodOverride = require("method-override");
const cors = require("cors");

module.exports = function () {
  const app = express(); // Express 애플리케이션 객체 생성

  // JSON 설정
  app.use(express.json()); // JSON 요청 본문 파싱
  app.use(express.urlencoded({ extended: true })); // URL 인코딩된 데이터 파싱

  // Compression 설정
  app.use(compression()); // 응답 데이터를 압축하여 전송

  // Method-Override 설정
  app.use(methodOverride()); // HTTP 메소드 오버라이드 (PUT, DELETE 등)

  // CORS 설정
  app.use(cors()); // CORS 허용

  return app; // 설정된 app 객체를 반환
};
