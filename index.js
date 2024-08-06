const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const specs = require("./config/swagger.config");
const { brandRouter } = require("./src/routes/brand.route");
const { postRouter, postsRouter } = require("./src/routes/post.route");



// 서버 가동
dotenv.config();
const app = express();

// 서버 설정
app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
  res.send("로컬마크 시작~");
});
app.use('/brand', brandRouter);

app.use('/posts', postsRouter);

app.listen(app.get("port"), () => {
  console.log(`Example app listening on port ${app.get("port")}`);
});
