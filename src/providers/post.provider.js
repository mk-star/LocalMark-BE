import { postDetailResponseDTO, postsResponseDTO } from "../dtos/post.dto.js";
import { getImagesByPostId } from "../models/image.dao.js";
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

    const postDetail = await getPreviewPostDetail(postId);
    let imagefileNames = [];
    imagefileNames = await getImagesByPostId(postId);

    return postDetailResponseDTO(postDetail, imagefileNames); 
}

