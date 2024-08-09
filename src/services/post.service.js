import { status } from "../../config/response.status.js";
import { postDetailResponseDTO } from "../dtos/post.dto.js";
import { deleteImageByPostId, getImageById } from "../models/image.dao.js";
import { 
    deletePost, 
    updatePost, 
    addPost } from "../models/post.dao.js";


export const addPostInfo = async (body) => {
  const { userId, category, title, image, type, content} = body;
  console.log(userId)

  const result = await addPost(userId, category, title, image, type, content);
  return result
}


export const createPost = async(body) => {
  
    let thumnail_filename = null;

    // imageId가 null이 아니고, 유효한 값일 때만 썸네일 파일명을 가져옴
    if (body.image_id !== null && body.image_id !== -1) {
        thumnail_filename = await getImageById(body.image_id);
    }
 
    const postId = await addPost({
        "userId": body.user_id,
        "title": body.title,
        "content": body.content,
        "category": body.category,
        "thumnail_filename": thumnail_filename //null 이 될 수 있음. (이미지 첨부를 아무것도 하지 않았을 때)
    })

}

export const updatePostDetail = async(data) => {

    const thumbnail_filename = getImageById(thumbnailId);

    const updatePostData = await updatePost(
        data.postId, 
        data.title, 
        data.content, 
        data.category, 
        thumbnail_filename
    );

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