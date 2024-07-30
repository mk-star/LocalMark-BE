import { addPostInfo } from '../services/post.service'
import { StatusCodes } from 'http-status-codes';
import { status } from "../../config/response.status";
import { getPosts } from "../proviers/post.providers";


export const addPost = async(req,res,next)=>{
  await addPostInfo(req.body)
  return res.send(StatusCodes.OK)
}

// 커뮤니티 게시글 전체 및 카테고리별 게시글 목록 조회
export const postsPreview = async(req,res) => {

        const querys = req.query;
        console.log(querys);

        const category = querys.category;
        console.log(category);
        const page = parseInt(querys.page);

        res.send(response(status.SUCCESS, await getPosts(category, page)));

}
