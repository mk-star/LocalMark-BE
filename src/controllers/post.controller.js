import { status } from "../../config/response.status";
import { getPosts } from "../proviers/post.providers";

// 커뮤니티 게시글 전체 및 카테고리별 게시글 목록 조회
export const posts = async(req, res) => {

        const querys = req.query;
        console.log(querys);

        const category = querys.category;
        console.log(category);
        const page = parseInt(querys.page);

        res.send(response(status.SUCCESS, await getPosts(category, page)));

}

export const postDetail = async(req, res) => [
        
        const  


]