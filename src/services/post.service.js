import { status } from "../../config/response.status";
import { postDetailResponseDTO } from "../dtos/post.dto";
import { deletePost, updatePost, addPost, getPreviewPostDetail, getPreviewPosts, getPreviewPostsByCategory } from "../models/post.dao";
import { postsResponseDTO } from "../dtos/post.dto"
import { deleteImageByPostId, getImageById, getImagesByPostId } from "../models/image.dao";

export const getPosts = async(category, page) => {

    if(category) {
        return postsResponseDTO(await getPreviewPostsByCategory(category, page));
    } else {
        return postsResponseDTO(await getPreviewPosts(page));
    }

}

export const getPostDetail = async(postId) => {

    const postDetail = await getPreviewPostDetail(postId);
    const imagefileNames = [];
    imagefileNames = await getImagesByPostId(postId);

    return postDetailResponseDTO(postDetail, imagefileNames); 
}


export const createPost = async(body) => {
    const postId = await addPost({
        "userId": userId,
        "title": title,
        "content": content,
        "category": category      
    })

}

export const updatePostDetail = async({postId, title, content, category, thumbnailId}) => {

    const thumbnail_filename = getImageById(thumbnailId);

    const updatePostData = await updatePost({postId, title, content, category, thumbnail_filename});

    if(updatePostData == -1) {
        throw new BaseError(status.POST_NOT_FOUND);
    } else {
        return postDetailResponseDTO(await updatePost(postId));
    }
}

export const deletePostById = async(postId) => {

    const deleteResult = await deletePost(postId);

    if (deleteResult == -1) {
        throw new BaseError(sta.PRODUCT_NOT_EXIST);
    } else {

        await deleteImageByPostId(postId);
        
        return { isSuccess: true, message: "게시글이 성공적으로 삭제되었습니다." };
    }

}