import { addPostInfo } from '../services/post.service.js'
import { status } from "../../config/response.status.js";
import { getPosts } from "../providers/post.provider.js";
import { response } from "../../config/response.js";


export const addPost = async(req,res,next)=>{
        // 업로드된 파일 목록을 파일 경로 배열로 변환
        const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
        // postInfo 필드를 JSON으로 파싱
        const postInfo = JSON.parse(req.body.postInfo);
        const postData = {
                ...postInfo,
                images, // 파일 경로 배열 설정
        };
        return res.send(response(status.SUCCESS,await addPostInfo(postData)));
}


// 커뮤니티 게시글 전체 및 카테고리별 게시글 목록 조회
export const postsPreview = async(req,res) => {

        const querys = req.query;
        console.log(querys);

        const category = querys.category;
        console.log(category);
        const page = parseInt(querys.page, 10) || 1; // 페이지 번호 기본값 설정

        res.send(response(status.SUCCESS, await getPosts(category, page)));

}
