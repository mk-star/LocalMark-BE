import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import specs from "./config/swagger.config.js";
import cookieParser from "cookie-parser";
import { response } from './config/response.js';
import { status } from './config/response.status.js';
import { postRouter } from "./src/routes/post.route.js";
import { authRouter } from "./src/routes/auth.route.js"; // .js 확장자 추가
import { likeRouter } from "./src/routes/Like.route.js";
import { commentRouter } from "./src/routes/comment.route.js";
import { healthRoute } from "./src/routes/health.route.js";
import { morelocalRouter } from './src/routes/morelocal.routes.js';
import { brandRouter } from "./src/routes/brand.route.js"
import { gelleryRouter } from "./src/routes/gallery.routes.js"

//서버 가동
dotenv.config();
const app = express();

// 서버 설정
app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(cookieParser());

// router setting
app.use('/gallery', gelleryRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/likes", likeRouter);
app.use("/auth", authRouter);
app.use('/brand', brandRouter);
app.use('/morelocal', morelocalRouter);

app.use("/health", healthRoute);

app.get("/", (req, res) => {
  res.send("로컬마크 시작~");
});

app.use((err, req, res, next) => {
    // 템플릿 엔진 변수 설정
    res.locals.message = err.message;
    // 개발환경이면 에러를 출력하고 아니면 출력하지 않기
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    console.error(err);
    res.status(err.data.status || status.INTERNAL_SERVER_ERROR).send(response(err.data));
});

app.listen(app.get('port'), () => {
    console.log(`Example app listening on port ${app.get('port')}`);
});
