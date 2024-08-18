import { postDetailResponseDTO, postsResponseDTO } from "../dtos/post.dto.js";
import { 
    getPreviewPostDetail, 
    getPreviewPosts } from "../models/post.dao.js";
import {getCommentNum} from "../models/comment.dao.js";
import {getLikeNum} from "../models/Like.dao.js";
import {getBrandInfoByUserId} from "../models/brand.dao.js";
import {getUserInfo} from "../services/user.service.js";

export const getPosts = async(category, page) => {

    const result = await getPreviewPosts(category, page);

    return postsResponseDTO(result.posts, result.totalPage);

}

export const getPostDetail = async(postId) => {

    const { post , images } = await getPreviewPostDetail(postId);
    console.log("post detail:", post);
    console.log("images:", images);
  
    const userId = post[0]?.user_id;

    // 비동기 함수들을 병렬로 실행
    const [commentNum, likeNum, brandInfo, userInfo] = await Promise.all([
        getCommentNum(postId),
        getLikeNum(postId),
        getBrandInfoByUserId(userId),
        getUserInfo(userId),
    ]);

    return postDetailResponseDTO(post, images, commentNum, likeNum, brandInfo, userInfo);
}

