import { postDetailResponseDTO, postsResponseDTO } from "../dtos/post.dto.js";
import { 
    getPreviewPostDetail, 
    getPreviewPosts } from "../models/post.dao.js";
import {getCommentNum} from "../models/comment.dao.js";
import {getLikeNum} from "../models/Like.dao.js";

export const getPosts = async(category, page) => {

    const result = await getPreviewPosts(category, page)

    return postsResponseDTO(result.posts, result.totalPage);

}

export const getPostDetail = async(postId) => {

    console.log(postId);

    const { post , images } = await getPreviewPostDetail(postId);
    console.log("post detail:", post);
    console.log("images:", images);
    return postDetailResponseDTO(post, images, await getCommentNum(), await getLikeNum());
}

