import { BaseError } from "../../config/error.js";
import { status } from "../../config/response.status.js";
import { postsResponseDTO, addPostResponseDTO, modifyPostResponseDTO } from "../dtos/post.dto.js";
import { deleteImageByPostId, saveImagesByPostId } from "../models/image.dao.js";
import { 
    deletePost, 
    addPost,
    getCreatorByBrandId, 
    getPostsByCreator,
    modifyPostById,
    getPreviewPostDetail} from "../models/post.dao.js";
    
export const addPostInfo = async(userId, body, imagekeys) => {

    const thumbnail_filename = encodeURIComponent(imagekeys[0]);
 
    const postId = await addPost({
        "userId": userId,
        "title": body.title,
        "content": body.content,
        "category": body.category,
        "thumnail_filename": thumbnail_filename //null 이 될 수 있음. (이미지 첨부를 아무것도 하지 않았을 때)
    })
    if (imagekeys && imagekeys.length > 0) {
        await saveImagesByPostId(postId, imagekeys);
    }

    return addPostResponseDTO(await getPreviewPostDetail(postId));
}

export const modifyPostDetail = async(postId, body, imagekeys) => {

    try {

        const thumbnail_filename = encodeURIComponent(imagekeys[0]);

        await modifyPostById(
            postId, 
            body.title, 
            body.content, 
            body.category, 
            thumbnail_filename
        );
        
        await updatePostImages(postId, imagekeys);

        return modifyPostResponseDTO(await getPreviewPostDetail(postId));
        
    } catch (error) {
        throw err;
    }
}

export const deletePostById = async(postId) => {

    const deleteResult = await deletePost(postId);

    if (deleteResult == -1) {
        throw new BaseError(status.POST_NOT_FOUND);
    } else { 
        await deleteImageByPostId(postId);
    
        return { isSuccess: true, message: "게시글이 성공적으로 삭제되었습니다." };
    }

}

export const getPostsByCreatorService = async(brandId) => {
    
    const creatorId = await getCreatorByBrandId(brandId);
    if (creatorId == -1) {
         throw new BaseError(status.LOGINID_NOT_EXISTS);
    } else {
        return postsResponseDTO(await getPostsByCreator(creatorId));
    }    

}


