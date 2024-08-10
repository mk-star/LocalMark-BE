
import { status } from "../../config/response.status.js";
import { getPostDetail, getPosts } from "../providers/post.provider.js";
import { response } from "../../config/response.js";
import { 
        addPostInfo,
        deletePostById, 
        getPostsByCreatorService,  
        modifyPostDetail } from "../services/post.service.js";
        
// 커뮤니티 게시글 전체 및 카테고리별 게시글 목록 조회
export const posts = async(req, res) => {

        const querys = req.query;
        console.log(querys);

        const category = querys.category;
        console.log(category);
        const page = parseInt(querys.page);

        res.send(response(status.SUCCESS, await getPosts(category, page)));

}

export const addPost = async(req, res) => {

        console.log("body: ", req.body);
        const postImages = req.files;
        
        const imagekeys = [];
        if (postImages && postImages.length > 0) {
                for (const postImage of postImages) {
                        imagekeys.push(postImage.key);
                }
        }

        res.send(response(status.SUCCESS, await addPostInfo(req.currentId, req.body, imagekeys)));
                
}

export const postDetail = async(req, res, next) => {
        
        console.log("게시글 상세 조회 요청");
        const params = req.params;
        console.log("params(postId): ", params);

        return res.send(response(status.SUCCESS, await getPostDetail(params)));

}

export const modifyPost = async(req, res) => {

        console.log("게시글 수정 요청");
        const postId = req.params.post_id;
        console.log("req.body: ", req.body);
        const newImages = req.files;

        const imagekeys = [];
        if (newImages && newImages.length > 0) {
                for (const newImage of newImages) {
                        imagekeys.push(newImage.key);
                }
        }
        

        res.send(response(status.SUCCESS,  
                await modifyPostDetail(postId, req.body, imagekeys)));

}

export const removePost = async(req, res) => {
        console.log("게시글 삭제 요청");
        const params = req.params;
        console.log("params(postId): ", params);

        return res.send(response(status.SUCCESS, await deletePostById(params)));
}


export const postsByCreator = async(req, res) => {

        console.log("크레이터의 게시글 조회 요청 ");
        
        return res.send(response(status.SUCCESS, await getPostsByCreatorService(req.params)));
}
