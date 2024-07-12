import "dotenv/config";
const { logger } = require("./config/winston");
const createApp = require("./config/express"); // express 설정 가져오기

const app = createApp(); // 함수 호출로 app 객체 생성

const port = process.env.PORT || 3000; // 서버 포트 지정

app.get("/", (req, res) => {
  res.send("로컬마크 시작~");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
