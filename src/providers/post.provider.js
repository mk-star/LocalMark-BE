import { postDetailResponseDTO, postsResponseDTO } from "../dtos/post.dto.js";
import { 
    getPreviewPostDetail, 
    getPreviewPosts, 
    getPreviewPostsByCategory } from "../models/post.dao.js";

export const getPosts = async(category, page) => {


    if(category) {
        return postsResponseDTO(await getPreviewPostsByCategory(category, page));
    } else {
        return postsResponseDTO(await getPreviewPosts(page));
    }

}

export const getPostDetail = async(postId) => {

    console.log(postId);
    
    return postDetailResponseDTO(await getPreviewPostDetail(postId)); 
}

