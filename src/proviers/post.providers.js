import { previewPostsResponseDTO } from "../dtos/post.dto"
import { getPreviewPosts, getPreviewPostsByCategory } from "../models/post.dao"

export const getPosts = async(category, page) => {

    if(category) {
        return previewPostsResponseDTO(await getPreviewPostsByCategory(category, page));
    } else {
        return previewPostsResponseDTO(await getPreviewPosts(page));
    }

}